"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  SectionConfig,
  GlobalSettings,
  DeviceView,
} from "@/lib/cms-types";
import { TemplateDefinition, SECTION_TEMPLATES, createSectionFromTemplate } from "@/lib/cms-templates";
import SectionRenderer from "./SectionRenderer";
import SectionSettingsSidebar from "./SectionSettingsSidebar";
import SectionLibraryModal from "./SectionLibraryModal";
import MediaLibraryModal from "./MediaLibraryModal";
import {
  Monitor,
  Tablet,
  Smartphone,
  Save,
  Globe,
  Undo2,
  Redo2,
  History,
  RotateCcw,
  Plus,
  Eye,
  EyeOff,
  Copy,
  Trash2,
  ArrowUp,
  ArrowDown,
  GripVertical,
  Check,
  AlertCircle,
  FileImage,
  Sliders,
  Settings,
  ExternalLink,
} from "lucide-react";

export default function HomepageBuilder() {
  const router = useRouter();

  // Core CMS state
  const [sections, setSections] = useState<SectionConfig[]>([]);
  const [globalSettings, setGlobalSettings] = useState<GlobalSettings>({});
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [deviceView, setDeviceView] = useState<DeviceView>("desktop");
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savingDraft, setSavingDraft] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Undo / Redo history
  const [history, setHistory] = useState<SectionConfig[][]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Modals state
  const [isSectionLibOpen, setIsSectionLibOpen] = useState(false);
  const [isMediaLibOpen, setIsMediaLibOpen] = useState(false);
  const [isRevisionModalOpen, setIsRevisionModalOpen] = useState(false);
  const [revisions, setRevisions] = useState<any[]>([]);
  const [mediaPickerCallback, setMediaPickerCallback] = useState<((url: string) => void) | null>(null);

  // Drag state
  const [draggedIdx, setDraggedIdx] = useState<number | null>(null);

  // Load initial draft from DB
  useEffect(() => {
    fetchHomepageData();
  }, []);

  async function fetchHomepageData() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/homepage");
      const data = await res.json();
      if (data.success && data.config) {
        const initialSections = (data.config.draftContent as SectionConfig[]) || [];
        setSections(initialSections);
        setGlobalSettings(data.config.globalSettings || {});
        setRevisions(data.config.revisions || []);
        setHistory([initialSections]);
        setHistoryIndex(0);
        if (initialSections && initialSections.length > 0 && initialSections[0]) {
          setActiveSectionId(initialSections[0].id);
        }
      }
    } catch (err) {
      console.error("Failed to load page config", err);
    } finally {
      setLoading(false);
    }
  }

  // Record a change in undo/redo history
  const commitChange = (newSections: SectionConfig[]) => {
    const updatedHistory = history.slice(0, historyIndex + 1);
    setHistory([...updatedHistory, newSections]);
    setHistoryIndex(updatedHistory.length);
    setSections(newSections);
    setHasUnsavedChanges(true);
  };

  const handleUndo = () => {
    if (historyIndex > 0 && history[historyIndex - 1]) {
      const newIdx = historyIndex - 1;
      setHistoryIndex(newIdx);
      setSections(history[newIdx]!);
      setHasUnsavedChanges(true);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1 && history[historyIndex + 1]) {
      const newIdx = historyIndex + 1;
      setHistoryIndex(newIdx);
      setSections(history[newIdx]!);
      setHasUnsavedChanges(true);
    }
  };

  // Section CRUD & Ordering
  const handleUpdateSection = (updated: SectionConfig) => {
    const newSections = sections.map((s) => (s.id === updated.id ? updated : s));
    commitChange(newSections);
  };

  const handleToggleVisibility = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSections = sections.map((s) =>
      s.id === id ? { ...s, isVisible: !s.isVisible } : s
    );
    commitChange(newSections);
  };

  const handleDuplicateSection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const targetIdx = sections.findIndex((s) => s.id === id);
    if (targetIdx === -1) return;
    const target = sections[targetIdx];
    if (!target) return;
    const clone: SectionConfig = {
      ...JSON.parse(JSON.stringify(target)),
      id: `sec-${target.type}-${Date.now().toString(36)}`,
      name: `${target.name} (Copy)`,
    };
    const newSections = [...sections];
    newSections.splice(targetIdx + 1, 0, clone);
    commitChange(newSections);
    setActiveSectionId(clone.id);
  };

  const handleDeleteSection = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (sections.length <= 1) {
      alert("You must keep at least one section.");
      return;
    }
    if (!confirm("Are you sure you want to delete this section?")) return;
    const newSections = sections.filter((s) => s.id !== id);
    commitChange(newSections);
    if (activeSectionId === id) {
      setActiveSectionId(newSections[0]?.id || null);
    }
  };

  const handleMoveUp = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (idx <= 0 || !sections[idx] || !sections[idx - 1]) return;
    const newSections = [...sections];
    const temp = newSections[idx]!;
    newSections[idx] = newSections[idx - 1]!;
    newSections[idx - 1] = temp;
    commitChange(newSections);
  };

  const handleMoveDown = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (idx >= sections.length - 1 || !sections[idx] || !sections[idx + 1]) return;
    const newSections = [...sections];
    const temp = newSections[idx]!;
    newSections[idx] = newSections[idx + 1]!;
    newSections[idx + 1] = temp;
    commitChange(newSections);
  };

  // Drag and drop ordering
  const handleDragStart = (idx: number) => {
    setDraggedIdx(idx);
  };

  const handleDragOver = (e: React.DragEvent, targetIdx: number) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) return;
    const newSections = [...sections];
    const item = newSections.splice(draggedIdx, 1)[0];
    if (item) {
      newSections.splice(targetIdx, 0, item);
      setDraggedIdx(targetIdx);
      setSections(newSections);
    }
  };

  const handleDragEnd = () => {
    setDraggedIdx(null);
    commitChange(sections);
  };

  // Add section from templates
  const handleAddTemplate = (tmpl: TemplateDefinition) => {
    const newSec = createSectionFromTemplate(tmpl, sections.length);
    const newSections = [...sections, newSec];
    commitChange(newSections);
    setActiveSectionId(newSec.id);
  };

  // Open Media Library Modal with callback
  const handleOpenMediaPicker = (cb: (url: string) => void) => {
    setMediaPickerCallback(() => cb);
    setIsMediaLibOpen(true);
  };

  // Save Draft
  const handleSaveDraft = async () => {
    setSavingDraft(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "save_draft",
          sections,
          globalSettings,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setHasUnsavedChanges(false);
        setStatusMessage("Draft successfully saved!");
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch (e) {
      console.error(e);
      alert("Failed to save draft.");
    } finally {
      setSavingDraft(false);
    }
  };

  // Publish Changes Live
  const handlePublish = async () => {
    if (!confirm("Are you ready to publish these changes to the live AEC Network homepage?")) {
      return;
    }
    setPublishing(true);
    setStatusMessage(null);
    try {
      const res = await fetch("/api/admin/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "publish",
          sections,
          globalSettings,
          note: `Super Admin published ${sections.length} sections`,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setHasUnsavedChanges(false);
        setStatusMessage(`🚀 Successfully published Version ${data.version}!`);
        setTimeout(() => setStatusMessage(null), 4000);
        // Refresh revisions list
        fetchHomepageData();
      }
    } catch (e) {
      console.error(e);
      alert("Failed to publish homepage.");
    } finally {
      setPublishing(false);
    }
  };

  // Discard Unpublished Changes
  const handleDiscard = async () => {
    if (!confirm("Discard all unpublished changes and revert to the live version?")) return;
    try {
      const res = await fetch("/api/admin/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "discard_draft" }),
      });
      const data = await res.json();
      if (data.success) {
        setSections(data.sections || []);
        setHasUnsavedChanges(false);
        setStatusMessage("Reverted to published version.");
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Restore Revision
  const handleRestoreRevision = async (revId: string) => {
    if (!confirm("Restore draft to this revision?")) return;
    try {
      const res = await fetch("/api/admin/homepage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "restore_revision", revisionId: revId }),
      });
      const data = await res.json();
      if (data.success) {
        setSections(data.sections);
        commitChange(data.sections);
        setIsRevisionModalOpen(false);
        setStatusMessage("Restored selected revision.");
        setTimeout(() => setStatusMessage(null), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const activeSection = sections.find((s) => s.id === activeSectionId) || null;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-slate-500">
        <div className="w-10 h-10 border-4 border-aec-teal border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold">Loading Homepage Builder...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-100 overflow-hidden font-sans">
      {/* TOP BUILDER TOOLBAR */}
      <header className="flex items-center justify-between px-4 sm:px-6 py-2.5 bg-white border-b border-slate-200 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/super-admin"
            className="text-xs font-bold text-slate-500 hover:text-aec-navy flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-slate-100 transition"
          >
            ← Super Admin
          </Link>
          <div className="h-4 w-[1px] bg-slate-200" />
          <h1 className="text-sm sm:text-base font-extrabold text-aec-navy tracking-tight flex items-center gap-2">
            <span>Website Management</span>
            <span className="text-slate-300 font-normal">/</span>
            <span className="text-aec-teal">Homepage Builder</span>
          </h1>

          {hasUnsavedChanges && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded-full">
              ● Unsaved Changes
            </span>
          )}
          {statusMessage && (
            <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full animate-in fade-in">
              {statusMessage}
            </span>
          )}
        </div>

        {/* Center: Device View Switcher & Undo/Redo */}
        <div className="flex items-center gap-2">
          {/* Undo / Redo */}
          <div className="flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50">
            <button
              onClick={handleUndo}
              disabled={historyIndex <= 0}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition"
              title="Undo"
            >
              <Undo2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleRedo}
              disabled={historyIndex >= history.length - 1}
              className="p-1.5 rounded-lg text-slate-600 hover:bg-white disabled:opacity-30 disabled:hover:bg-transparent transition"
              title="Redo"
            >
              <Redo2 className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Device Previews */}
          <div className="hidden md:flex items-center border border-slate-200 rounded-xl p-0.5 bg-slate-50">
            <button
              onClick={() => setDeviceView("desktop")}
              className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                deviceView === "desktop" ? "bg-white shadow-xs text-aec-navy" : "text-slate-500 hover:text-slate-900"
              }`}
              title="Desktop View"
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceView("tablet")}
              className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                deviceView === "tablet" ? "bg-white shadow-xs text-aec-navy" : "text-slate-500 hover:text-slate-900"
              }`}
              title="Tablet View (768px)"
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeviceView("mobile")}
              className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                deviceView === "mobile" ? "bg-white shadow-xs text-aec-navy" : "text-slate-500 hover:text-slate-900"
              }`}
              title="Mobile View (375px)"
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* History */}
          <button
            onClick={() => setIsRevisionModalOpen(true)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 border border-slate-200 transition"
            title="Revision History"
          >
            <History className="w-4 h-4" />
          </button>

          {/* Live Preview external */}
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1 px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            <span>Live Site</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          {/* Discard */}
          {hasUnsavedChanges && (
            <button
              onClick={handleDiscard}
              className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-600 text-xs font-semibold hover:bg-rose-50 transition"
            >
              Discard
            </button>
          )}

          {/* Save Draft */}
          <button
            onClick={handleSaveDraft}
            disabled={savingDraft}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition disabled:opacity-50"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{savingDraft ? "Saving..." : "Save Draft"}</span>
          </button>

          {/* Publish */}
          <button
            onClick={handlePublish}
            disabled={publishing}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-aec-teal to-sky-600 hover:opacity-95 text-white text-xs font-extrabold shadow-md transition disabled:opacity-50"
          >
            <Globe className="w-3.5 h-3.5" />
            <span>{publishing ? "Publishing..." : "Publish Live"}</span>
          </button>
        </div>
      </header>

      {/* MAIN 3-PANEL BUILDER WORKSPACE */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT SIDEBAR: SECTIONS LIST & LIBRARY TOOLS */}
        <aside className="w-72 sm:w-80 border-r border-slate-200 bg-white flex flex-col justify-between overflow-hidden z-10 shadow-xs">
          {/* Top of Left Sidebar */}
          <div className="flex flex-col h-full overflow-hidden">
            <div className="p-4 border-b border-slate-200 space-y-2.5 bg-slate-50/70">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Homepage Structure
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  {sections.length} sections
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIsSectionLibOpen(true)}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-aec-navy text-white text-xs font-bold shadow-xs hover:bg-aec-navy/90 transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Section</span>
                </button>
                <button
                  onClick={() => {
                    setMediaPickerCallback(null);
                    setIsMediaLibOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition"
                >
                  <FileImage className="w-3.5 h-3.5 text-aec-teal" />
                  <span>Media Library</span>
                </button>
              </div>
            </div>

            {/* Draggable Sections List */}
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {sections.map((sec, idx) => {
                const isActive = activeSectionId === sec.id;
                return (
                  <div
                    key={sec.id}
                    draggable
                    onDragStart={() => handleDragStart(idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDragEnd={handleDragEnd}
                    onClick={() => setActiveSectionId(sec.id)}
                    className={`group relative flex items-center justify-between p-2.5 rounded-2xl border transition-all cursor-pointer ${
                      isActive
                        ? "border-aec-teal bg-sky-50/50 shadow-xs ring-1 ring-aec-teal"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-xs"
                    } ${!sec.isVisible ? "opacity-60 bg-slate-50" : ""}`}
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="cursor-grab active:cursor-grabbing text-slate-300 hover:text-slate-600 p-1"
                        title="Drag to reorder"
                      >
                        <GripVertical className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <p
                          className={`text-xs font-bold truncate ${
                            isActive ? "text-aec-navy" : "text-slate-700"
                          }`}
                        >
                          {sec.name}
                        </p>
                        <span className="text-[10px] uppercase font-semibold text-slate-400">
                          {sec.type}
                        </span>
                      </div>
                    </div>

                    {/* Section Quick Actions */}
                    <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition">
                      <button
                        onClick={(e) => handleToggleVisibility(sec.id, e)}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                        title={sec.isVisible ? "Hide Section" : "Show Section"}
                      >
                        {sec.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-amber-500" />}
                      </button>
                      <button
                        onClick={(e) => handleMoveUp(idx, e)}
                        disabled={idx === 0}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 rounded-lg hover:bg-slate-100"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleMoveDown(idx, e)}
                        disabled={idx === sections.length - 1}
                        className="p-1 text-slate-400 hover:text-slate-700 disabled:opacity-20 rounded-lg hover:bg-slate-100"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDuplicateSection(sec.id, e)}
                        className="p-1 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100"
                        title="Duplicate"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteSection(sec.id, e)}
                        className="p-1 text-rose-400 hover:text-rose-600 rounded-lg hover:bg-rose-50"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </aside>

        {/* CENTER: LIVE HOMEPAGE PREVIEW CANVAS */}
        <main className="flex-1 overflow-y-auto bg-slate-200/70 p-4 sm:p-8 flex justify-center">
          <div
            className={`transition-all duration-300 bg-white shadow-2xl rounded-2xl overflow-hidden border border-slate-300 flex flex-col ${
              deviceView === "mobile"
                ? "w-[385px] min-h-[800px]"
                : deviceView === "tablet"
                ? "w-[780px] min-h-[900px]"
                : "w-full max-w-[1400px]"
            }`}
          >
            {/* Live Interactive Sections Container */}
            <div className="flex flex-col">
              {sections.map((section, idx) => {
                const isSelected = activeSectionId === section.id;
                return (
                  <div
                    key={section.id}
                    onClick={() => setActiveSectionId(section.id)}
                    className={`relative group transition-all duration-150 ${
                      isSelected
                        ? "ring-4 ring-aec-teal ring-inset z-10"
                        : "hover:outline hover:outline-2 hover:outline-dashed hover:outline-aec-teal/60"
                    } ${!section.isVisible ? "opacity-40" : ""}`}
                  >
                    {/* Hover Floating Controls Bar */}
                    <div className="absolute top-3 right-3 z-30 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-1 bg-slate-900/90 text-white backdrop-blur-md px-2.5 py-1.5 rounded-xl shadow-xl text-xs font-semibold">
                      <span className="text-[11px] text-aec-teal mr-1">{section.name}</span>
                      <button
                        onClick={(e) => handleMoveUp(idx, e)}
                        disabled={idx === 0}
                        className="p-1 hover:bg-white/20 rounded disabled:opacity-30"
                        title="Move Up"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleMoveDown(idx, e)}
                        disabled={idx === sections.length - 1}
                        className="p-1 hover:bg-white/20 rounded disabled:opacity-30"
                        title="Move Down"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleToggleVisibility(section.id, e)}
                        className="p-1 hover:bg-white/20 rounded"
                        title="Hide/Show"
                      >
                        {section.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-amber-400" />}
                      </button>
                      <button
                        onClick={(e) => handleDuplicateSection(section.id, e)}
                        className="p-1 hover:bg-white/20 rounded"
                        title="Duplicate"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDeleteSection(section.id, e)}
                        className="p-1 hover:bg-rose-500 rounded text-rose-300 hover:text-white"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Section Badge indicator */}
                    {!section.isVisible && (
                      <div className="absolute top-3 left-3 z-20 bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow">
                        HIDDEN FROM PUBLIC
                      </div>
                    )}

                    {/* Actual Section Render */}
                    <SectionRenderer section={section} isEditor={true} />
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        {/* RIGHT SIDEBAR: ACTIVE SECTION SETTINGS */}
        <SectionSettingsSidebar
          section={activeSection}
          onUpdateSection={handleUpdateSection}
          onOpenMediaLibrary={handleOpenMediaPicker}
          onClose={() => setActiveSectionId(null)}
        />
      </div>

      {/* SECTION LIBRARY MODAL */}
      <SectionLibraryModal
        isOpen={isSectionLibOpen}
        onClose={() => setIsSectionLibOpen(false)}
        onSelectTemplate={handleAddTemplate}
        onOpenCustomBuilder={() => {
          const customTmpl = SECTION_TEMPLATES.find((t) => t.type === "custom");
          if (customTmpl) handleAddTemplate(customTmpl);
        }}
      />

      {/* MEDIA LIBRARY MODAL */}
      <MediaLibraryModal
        isOpen={isMediaLibOpen}
        onClose={() => {
          setIsMediaLibOpen(false);
          setMediaPickerCallback(null);
        }}
        onSelectImage={(asset) => {
          if (mediaPickerCallback) {
            mediaPickerCallback(asset.url);
          }
        }}
      />

      {/* REVISION HISTORY MODAL */}
      {isRevisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-aec-navy" />
                <h3 className="text-base font-bold text-slate-900">Revision History & Restore</h3>
              </div>
              <button
                onClick={() => setIsRevisionModalOpen(false)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>
            <div className="p-6 overflow-y-auto space-y-3">
              {revisions.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-6">No revisions recorded yet.</p>
              ) : (
                revisions.map((rev) => (
                  <div
                    key={rev.id}
                    className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200 hover:border-aec-teal hover:shadow-xs transition"
                  >
                    <div>
                      <span className="text-xs font-bold text-aec-navy">Version {rev.version}</span>
                      <p className="text-xs text-slate-600 mt-0.5">{rev.note || "Published update"}</p>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {new Date(rev.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleRestoreRevision(rev.id)}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-aec-navy hover:text-white text-slate-700 text-xs font-bold transition flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Restore</span>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
