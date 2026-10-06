import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUserSession } from "@/lib/scoped-queries";
import { isOneOf } from "@/lib/permissions";
import { DEFAULT_HOMEPAGE_SECTIONS, DEFAULT_GLOBAL_SETTINGS } from "@/lib/cms-defaults";
import { SectionConfig, GlobalSettings } from "@/lib/cms-types";

// GET /api/admin/homepage — Fetch current draft and published status
export async function GET(req: Request) {
  try {
    const { userId, role } = await getCurrentUserSession();
    if (!userId || !isOneOf(role, ["SUPER_ADMIN", "DIRECTOR"])) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    let config = await prisma.pageConfig.findUnique({
      where: { slug: "home" },
      include: {
        revisions: {
          orderBy: { createdAt: "desc" },
          take: 10,
          select: {
            id: true,
            version: true,
            note: true,
            createdAt: true,
            createdBy: true,
          },
        },
      },
    });

    if (!config) {
      config = await prisma.pageConfig.create({
        data: {
          slug: "home",
          title: "Homepage",
          publishedContent: DEFAULT_HOMEPAGE_SECTIONS as any,
          draftContent: DEFAULT_HOMEPAGE_SECTIONS as any,
          globalSettings: DEFAULT_GLOBAL_SETTINGS as any,
          isPublished: true,
        },
        include: {
          revisions: true,
        },
      });

      await prisma.pageRevision.create({
        data: {
          pageConfigId: config.id,
          version: 1,
          note: "Initial version",
          sections: DEFAULT_HOMEPAGE_SECTIONS as any,
          createdBy: userId,
        },
      });
    }

    return NextResponse.json({
      success: true,
      config: {
        id: config.id,
        slug: config.slug,
        title: config.title,
        draftContent: config.draftContent,
        publishedContent: config.publishedContent,
        globalSettings: config.globalSettings || DEFAULT_GLOBAL_SETTINGS,
        updatedAt: config.updatedAt,
        revisions: config.revisions || [],
      },
    });
  } catch (error: any) {
    console.error("[API_HOMEPAGE_GET_ERROR]", error);
    return NextResponse.json({ error: error.message || "Failed to load homepage" }, { status: 500 });
  }
}

// POST /api/admin/homepage — Save draft, publish, or discard
export async function POST(req: Request) {
  try {
    const { userId, role } = await getCurrentUserSession();
    if (!userId || !isOneOf(role, ["SUPER_ADMIN", "DIRECTOR"])) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { action, sections, globalSettings, note } = body;

    let config = await prisma.pageConfig.findUnique({
      where: { slug: "home" },
    });

    if (!config) {
      config = await prisma.pageConfig.create({
        data: {
          slug: "home",
          title: "Homepage",
          publishedContent: DEFAULT_HOMEPAGE_SECTIONS as any,
          draftContent: DEFAULT_HOMEPAGE_SECTIONS as any,
          globalSettings: DEFAULT_GLOBAL_SETTINGS as any,
        },
      });
    }

    if (action === "save_draft") {
      // Save changes to draftContent only
      const updated = await prisma.pageConfig.update({
        where: { slug: "home" },
        data: {
          draftContent: sections as any,
          globalSettings: globalSettings as any,
          updatedBy: userId,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Draft saved successfully",
        updatedAt: updated.updatedAt,
      });
    }

    if (action === "publish") {
      // Save to both draft and publishedContent, create a revision record
      const lastRevision = await prisma.pageRevision.findFirst({
        where: { pageConfigId: config.id },
        orderBy: { version: "desc" },
      });
      const nextVersion = (lastRevision?.version || 0) + 1;

      const [updated, revision] = await prisma.$transaction([
        prisma.pageConfig.update({
          where: { slug: "home" },
          data: {
            draftContent: sections as any,
            publishedContent: sections as any,
            globalSettings: globalSettings as any,
            isPublished: true,
            updatedBy: userId,
          },
        }),
        prisma.pageRevision.create({
          data: {
            pageConfigId: config.id,
            version: nextVersion,
            note: note || `Published version v${nextVersion}`,
            sections: sections as any,
            createdBy: userId,
          },
        }),
      ]);

      return NextResponse.json({
        success: true,
        message: `Published successfully as Version ${nextVersion}`,
        version: nextVersion,
        revisionId: revision.id,
        updatedAt: updated.updatedAt,
      });
    }

    if (action === "discard_draft") {
      // Revert draftContent to match publishedContent
      const updated = await prisma.pageConfig.update({
        where: { slug: "home" },
        data: {
          draftContent: config.publishedContent as any,
          updatedBy: userId,
        },
      });

      return NextResponse.json({
        success: true,
        message: "Unpublished changes discarded",
        sections: config.publishedContent,
      });
    }

    if (action === "restore_revision") {
      const { revisionId } = body;
      if (!revisionId) {
        return NextResponse.json({ error: "Missing revisionId" }, { status: 400 });
      }

      const rev = await prisma.pageRevision.findUnique({
        where: { id: revisionId },
      });

      if (!rev) {
        return NextResponse.json({ error: "Revision not found" }, { status: 404 });
      }

      const updated = await prisma.pageConfig.update({
        where: { slug: "home" },
        data: {
          draftContent: rev.sections as any,
          updatedBy: userId,
        },
      });

      return NextResponse.json({
        success: true,
        message: `Restored draft from revision v${rev.version}`,
        sections: rev.sections,
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error: any) {
    console.error("[API_HOMEPAGE_POST_ERROR]", error);
    return NextResponse.json({ error: error.message || "Failed to update homepage" }, { status: 500 });
  }
}
