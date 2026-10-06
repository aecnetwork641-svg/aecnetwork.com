"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Folder, Upload, Search, Trash2, Check, RefreshCw, X, FileImage } from "lucide-react";

interface MediaAsset {
  id: string;
  filename: string;
  url: string;
  folder: string;
  size?: number;
  mimeType?: string;
  altText?: string;
  title?: string;
}

interface MediaLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (asset: { url: string; altText?: string; title?: string }) => void;
  activeFolder?: string;
}

const FOLDERS = [
  { id: "all", label: "All Assets" },
  { id: "homepage", label: "/homepage" },
  { id: "courses", label: "/courses" },
  { id: "teachers", label: "/teachers" },
  { id: "programs", label: "/programs" },
  { id: "banners", label: "/banners" },
  { id: "gallery", label: "/gallery" },
];

export default function MediaLibraryModal({
  isOpen,
  onClose,
  onSelectImage,
  activeFolder = "all",
}: MediaLibraryModalProps) {
  const [assets, setAssets] = useState<MediaAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string>(activeFolder);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAsset, setSelectedAsset] = useState<MediaAsset | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      loadAssets();
    }
  }, [isOpen, selectedFolder, searchQuery]);

  async function loadAssets() {
    setLoading(true);
    try {
      const url = new URL("/api/admin/media", window.location.origin);
      if (selectedFolder && selectedFolder !== "all") {
        url.searchParams.set("folder", selectedFolder);
      }
      if (searchQuery.trim()) {
        url.searchParams.set("q", searchQuery.trim());
      }
      const res = await fetch(url.toString());
      const data = await res.json();
      if (data.success) {
        setAssets(data.assets || []);
      }
    } catch (e) {
      console.error("Failed to load assets", e);
    } finally {
      setLoading(false);
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", selectedFolder === "all" ? "homepage" : selectedFolder);
      formData.append("title", file.name);

      const res = await fetch("/api/admin/media", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.asset) {
        setAssets((prev) => [data.asset, ...prev]);
        setSelectedAsset(data.asset);
      }
    } catch (e) {
      console.error("Upload failed", e);
    } finally {
      setUploading(false);
    }
  }

  async function handleDeleteAsset(id: string) {
    if (!confirm("Are you sure you want to delete this media asset?")) return;
    try {
      const res = await fetch("/api/admin/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", assetId: id }),
      });
      const data = await res.json();
      if (data.success) {
        setAssets((prev) => prev.filter((a) => a.id !== id));
        if (selectedAsset?.id === id) {
          setSelectedAsset(null);
        }
      }
    } catch (e) {
      console.error("Delete failed", e);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative flex flex-col w-full max-w-5xl h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-aec-navy text-white">
              <FileImage className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Media Library & File Manager</h2>
              <p className="text-xs text-slate-500">Upload, organize, and select images for your homepage sections</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar & Folders */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {FOLDERS.map((folder) => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                  selectedFolder === folder.id
                    ? "bg-aec-navy text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                <Folder className="w-3.5 h-3.5" />
                <span>{folder.label}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search images..."
                className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-aec-teal w-44 sm:w-56"
              />
            </div>

            <label className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-aec-teal text-white text-xs font-bold shadow-xs hover:bg-aec-teal/90 transition cursor-pointer">
              <Upload className="w-3.5 h-3.5" />
              <span>{uploading ? "Uploading..." : "Upload New Image"}</span>
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Body Grid & Sidebar */}
        <div className="flex-1 flex overflow-hidden">
          {/* Main Grid */}
          <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
            {loading ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <RefreshCw className="w-8 h-8 animate-spin mb-2 text-aec-teal" />
                <p className="text-xs">Loading media assets...</p>
              </div>
            ) : assets.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <FileImage className="w-12 h-12 stroke-[1.5] mb-2 opacity-50" />
                <p className="text-sm font-semibold text-slate-600">No images found in this folder</p>
                <p className="text-xs text-slate-400 mt-1">Upload a new image to get started</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {assets.map((asset) => {
                  const isSelected = selectedAsset?.id === asset.id;
                  return (
                    <div
                      key={asset.id}
                      onClick={() => setSelectedAsset(asset)}
                      className={`group relative flex flex-col rounded-2xl overflow-hidden border cursor-pointer transition-all ${
                        isSelected
                          ? "border-aec-teal ring-2 ring-aec-teal shadow-md"
                          : "border-slate-200 bg-white hover:shadow-sm"
                      }`}
                    >
                      <div className="relative aspect-square w-full bg-slate-100 overflow-hidden">
                        <img
                          src={asset.url}
                          alt={asset.altText || asset.title || asset.filename}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {isSelected && (
                          <div className="absolute top-2 right-2 p-1 rounded-full bg-aec-teal text-white shadow">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        )}
                      </div>
                      <div className="p-2.5 bg-white border-t border-slate-100">
                        <p className="text-xs font-semibold text-slate-800 truncate" title={asset.title || asset.filename}>
                          {asset.title || asset.filename}
                        </p>
                        <p className="text-[10px] text-slate-400 truncate">
                          folder: /{asset.folder}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Details & Select Panel */}
          {selectedAsset && (
            <div className="w-72 border-l border-slate-200 bg-white p-5 flex flex-col justify-between overflow-y-auto">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Asset Details</p>
                <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-video bg-slate-100">
                  <img
                    src={selectedAsset.url}
                    alt={selectedAsset.title || selectedAsset.filename}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-2 text-xs">
                  <div>
                    <label className="text-[11px] font-bold text-slate-500">File URL</label>
                    <input
                      type="text"
                      readOnly
                      value={selectedAsset.url}
                      className="w-full mt-0.5 px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-[11px]"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500">Alt Text</label>
                    <input
                      type="text"
                      value={selectedAsset.altText || ""}
                      onChange={(e) =>
                        setSelectedAsset({ ...selectedAsset, altText: e.target.value })
                      }
                      className="w-full mt-0.5 px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs focus:ring-1 focus:ring-aec-teal"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-500">Image Title</label>
                    <input
                      type="text"
                      value={selectedAsset.title || ""}
                      onChange={(e) =>
                        setSelectedAsset({ ...selectedAsset, title: e.target.value })
                      }
                      className="w-full mt-0.5 px-2.5 py-1.5 border border-slate-200 rounded-lg text-slate-800 text-xs focus:ring-1 focus:ring-aec-teal"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleDeleteAsset(selectedAsset.id)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 text-xs text-rose-600 hover:bg-rose-50 rounded-xl transition"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete Asset</span>
                </button>
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2">
                <button
                  onClick={() => {
                    onSelectImage({
                      url: selectedAsset.url,
                      altText: selectedAsset.altText || selectedAsset.title,
                      title: selectedAsset.title,
                    });
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl bg-aec-navy text-white text-xs font-bold shadow-md hover:bg-aec-navy/90 transition flex items-center justify-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Use This Image</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full py-2 rounded-xl text-slate-600 text-xs font-semibold hover:bg-slate-100 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
