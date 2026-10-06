import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserSession } from "@/lib/scoped-queries";
import { isOneOf } from "@/lib/permissions";
import fs from "fs/promises";
import path from "path";

// GET /api/admin/media — List media assets, with folder filter & search
export async function GET(req: Request) {
  try {
    const { userId, role } = await getCurrentUserSession();
    if (!userId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "DIRECTOR"])) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(req.url);
    const folder = searchParams.get("folder") || undefined;
    const query = searchParams.get("q") || undefined;

    const where: any = {};
    if (folder && folder !== "all") {
      where.folder = folder;
    }
    if (query) {
      where.OR = [
        { filename: { contains: query, mode: "insensitive" } },
        { title: { contains: query, mode: "insensitive" } },
        { altText: { contains: query, mode: "insensitive" } },
      ];
    }

    let assets = await prisma.mediaAsset.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    // If database is empty, seed it with existing files in public/images
    if (assets.length === 0 && !query && (!folder || folder === "all")) {
      const defaultImages = [
        { filename: "banner-1.png", url: "/images/banner-1.png", folder: "banners", title: "Hero Banner 1" },
        { filename: "banner-2.png", url: "/images/banner-2.png", folder: "banners", title: "Hero Banner 2" },
        { filename: "banner-3.png", url: "/images/banner-3.png", folder: "banners", title: "Hero Banner 3" },
        { filename: "about-aec.jpg", url: "/images/about-aec.jpg", folder: "homepage", title: "About AEC Overview" },
        { filename: "about-one-on-one.jpg", url: "/images/about-one-on-one.jpg", folder: "homepage", title: "One-to-One Session" },
        { filename: "quran.jpg", url: "/images/courses/quran.jpg", folder: "courses", title: "Quran Mastery" },
        { filename: "translation.jpg", url: "/images/courses/translation.jpg", folder: "courses", title: "Quran Translation" },
        { filename: "hifz.jpg", url: "/images/courses/hifz.jpg", folder: "courses", title: "Hifz-ul-Quran" },
        { filename: "computer-programming.jpg", url: "/images/courses/computer-programming.jpg", folder: "courses", title: "Programming" },
        { filename: "web-development.jpg", url: "/images/courses/web-development.jpg", folder: "courses", title: "Web Development" },
        { filename: "gcse.jpg", url: "/images/courses/gcse.jpg", folder: "courses", title: "GCSE Prep" },
        { filename: "member-01.jpg", url: "/images/team/member-01.jpg", folder: "teachers", title: "Instructor Sophia" },
        { filename: "member-02.jpg", url: "/images/team/member-02.jpg", folder: "teachers", title: "Instructor Cindy" },
        { filename: "member-03.jpg", url: "/images/team/member-03.jpg", folder: "teachers", title: "Instructor David" },
        { filename: "member-04.jpg", url: "/images/team/member-04.jpg", folder: "teachers", title: "Instructor Stella" },
      ];

      await prisma.mediaAsset.createMany({
        data: defaultImages.map((img) => ({
          filename: img.filename,
          url: img.url,
          folder: img.folder,
          title: img.title,
          altText: img.title,
        })),
        skipDuplicates: true,
      });

      assets = await prisma.mediaAsset.findMany({
        where,
        orderBy: { createdAt: "desc" },
      });
    }

    return NextResponse.json({ success: true, assets });
  } catch (error: any) {
    console.error("[API_MEDIA_GET_ERROR]", error);
    return NextResponse.json({ error: error.message || "Failed to fetch media assets" }, { status: 500 });
  }
}

// POST /api/admin/media — Upload new file, update metadata, or delete
export async function POST(req: Request) {
  try {
    const { userId, role } = await getCurrentUserSession();
    if (!userId || !isOneOf(role, ["SUPER_ADMIN", "ADMIN", "DIRECTOR"])) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const contentType = req.headers.get("content-type") || "";

    // Handle Multipart Form Data for File Uploads
    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      const folder = (formData.get("folder") as string) || "homepage";
      const customTitle = formData.get("title") as string | null;

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Sanitize filename & create safe storage path
      const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const uniqueFilename = `${Date.now()}-${originalName}`;
      
      const uploadDir = path.join(process.cwd(), "public", "uploads", folder);
      await fs.mkdir(uploadDir, { recursive: true });

      const filePath = path.join(uploadDir, uniqueFilename);
      await fs.writeFile(filePath, buffer);

      const publicUrl = `/uploads/${folder}/${uniqueFilename}`;

      const asset = await prisma.mediaAsset.create({
        data: {
          filename: originalName,
          url: publicUrl,
          folder: folder,
          mimeType: file.type,
          size: file.size,
          title: customTitle || originalName,
          altText: customTitle || originalName,
        },
      });

      return NextResponse.json({
        success: true,
        message: "File uploaded successfully",
        asset,
      });
    }

    // Handle JSON body for actions: edit, rename, delete
    const body = await req.json();
    const { action, assetId, updates } = body;

    if (action === "update" && assetId) {
      const updated = await prisma.mediaAsset.update({
        where: { id: assetId },
        data: {
          title: updates?.title,
          altText: updates?.altText,
          caption: updates?.caption,
          folder: updates?.folder,
        },
      });
      return NextResponse.json({ success: true, asset: updated });
    }

    if (action === "delete" && assetId) {
      const asset = await prisma.mediaAsset.findUnique({ where: { id: assetId } });
      if (asset) {
        // Try removing file from disk if it was stored in /uploads
        if (asset.url.startsWith("/uploads/")) {
          try {
            const diskPath = path.join(process.cwd(), "public", asset.url);
            await fs.unlink(diskPath);
          } catch (e) {
            console.warn("Could not remove file on disk:", e);
          }
        }
        await prisma.mediaAsset.delete({ where: { id: assetId } });
      }
      return NextResponse.json({ success: true, message: "Asset deleted" });
    }

    return NextResponse.json({ error: "Invalid media action" }, { status: 400 });
  } catch (error: any) {
    console.error("[API_MEDIA_POST_ERROR]", error);
    return NextResponse.json({ error: error.message || "Failed to process media request" }, { status: 500 });
  }
}
