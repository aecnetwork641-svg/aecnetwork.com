"use client";

import React, { useState } from "react";
import { SectionConfig } from "@/lib/cms-types";
import RichTextEditor from "./RichTextEditor";
import {
  Palette,
  Layout,
  Type,
  Image as ImageIcon,
  Trash2,
  Plus,
  MoveUp,
  MoveDown,
  Layers,
  Sparkles,
} from "lucide-react";

interface SectionSettingsSidebarProps {
  section: SectionConfig | null;
  onUpdateSection: (updated: SectionConfig) => void;
  onOpenMediaLibrary: (onSelect: (url: string) => void) => void;
  onClose: () => void;
}

export default function SectionSettingsSidebar({
  section,
  onUpdateSection,
  onOpenMediaLibrary,
  onClose,
}: SectionSettingsSidebarProps) {
  const [activeTab, setActiveTab] = useState<"content" | "design">("content");

  if (!section) {
    return (
      <aside className="w-80 sm:w-96 border-l border-slate-200 bg-white p-6 flex flex-col items-center justify-center text-center text-slate-400">
        <Layers className="w-10 h-10 mb-2 opacity-40" />
        <p className="text-sm font-semibold text-slate-600">No Section Selected</p>
        <p className="text-xs text-slate-400 mt-1">
          Click any section in the preview or left list to edit its content and styling.
        </p>
      </aside>
    );
  }

  const { data = {}, design = {} } = section;

  const updateData = (key: string, value: any) => {
    onUpdateSection({
      ...section,
      data: {
        ...section.data,
        [key]: value,
      },
    });
  };

  const updateDesign = (key: string, value: any) => {
    onUpdateSection({
      ...section,
      design: {
        ...section.design,
        [key]: value,
      },
    });
  };

  return (
    <aside className="w-80 sm:w-96 border-l border-slate-200 bg-white flex flex-col h-full overflow-hidden shadow-lg z-20">
      {/* Sidebar Header */}
      <div className="p-4 border-b border-slate-200 bg-slate-50/90 flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-aec-teal">
            {section.category} Section
          </span>
          <h3 className="text-sm font-bold text-slate-900 truncate max-w-[200px]">
            {section.name}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="text-xs text-slate-400 hover:text-slate-700 px-2 py-1 rounded-lg hover:bg-slate-200 transition"
        >
          ✕
        </button>
      </div>

      {/* Tabs: Content vs Design */}
      <div className="flex border-b border-slate-200 bg-white px-4 pt-2 gap-4">
        <button
          onClick={() => setActiveTab("content")}
          className={`flex items-center gap-1.5 pb-2.5 text-xs font-bold transition border-b-2 ${
            activeTab === "content"
              ? "border-aec-navy text-aec-navy"
              : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          <Type className="w-3.5 h-3.5" />
          <span>Content</span>
        </button>
        <button
          onClick={() => setActiveTab("design")}
          className={`flex items-center gap-1.5 pb-2.5 text-xs font-bold transition border-b-2 ${
            activeTab === "design"
              ? "border-aec-navy text-aec-navy"
              : "border-transparent text-slate-400 hover:text-slate-700"
          }`}
        >
          <Palette className="w-3.5 h-3.5" />
          <span>Design & Style</span>
        </button>
      </div>

      {/* Settings Form Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {activeTab === "content" ? (
          <div className="space-y-5">
            {/* Common: Section Name */}
            <div>
              <label className="text-[11px] font-bold uppercase text-slate-500">Section Label</label>
              <input
                type="text"
                value={section.name}
                onChange={(e) => onUpdateSection({ ...section, name: e.target.value })}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-xs focus:ring-1 focus:ring-aec-teal"
              />
            </div>

            {/* HERO SLIDER SPECIFIC */}
            {section.type === "hero-slider" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Slides ({data.slides?.length || 0})</label>
                  <button
                    type="button"
                    onClick={() => {
                      const newSlides = [
                        ...(data.slides || []),
                        {
                          id: `s-${Date.now()}`,
                          title: "New Headline",
                          subtitle: "Inspiring subtext for this slide.",
                          image: "/images/banner-1",
                          imageExt: "png",
                          accentColor: "#4DA3D9",
                          glowColor: "#EAF5FC",
                          primaryBtn: { label: "Enroll Now", href: "/admissions/apply" },
                          secondaryBtn: { label: "Free Trial", href: "/admissions/free-trial" },
                        },
                      ];
                      updateData("slides", newSlides);
                    }}
                    className="text-xs text-aec-teal font-bold hover:underline"
                  >
                    + Add Slide
                  </button>
                </div>

                {data.slides?.map((slide: any, sIdx: number) => (
                  <div key={slide.id || sIdx} className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-700">Slide #{sIdx + 1}</span>
                      <button
                        onClick={() => {
                          const filtered = data.slides.filter((_: any, i: number) => i !== sIdx);
                          updateData("slides", filtered);
                        }}
                        className="text-rose-500 text-xs hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">Slide Title</label>
                      <input
                        type="text"
                        value={slide.title}
                        onChange={(e) => {
                          const copy = [...data.slides];
                          copy[sIdx].title = e.target.value;
                          updateData("slides", copy);
                        }}
                        className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-0.5 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">Subtitle</label>
                      <textarea
                        rows={2}
                        value={slide.subtitle}
                        onChange={(e) => {
                          const copy = [...data.slides];
                          copy[sIdx].subtitle = e.target.value;
                          updateData("slides", copy);
                        }}
                        className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-0.5 bg-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500">Slide Image</label>
                      <div className="flex gap-2 mt-0.5">
                        <input
                          type="text"
                          value={slide.image}
                          onChange={(e) => {
                            const copy = [...data.slides];
                            copy[sIdx].image = e.target.value;
                            updateData("slides", copy);
                          }}
                          className="flex-1 text-xs rounded-xl border border-slate-200 p-2 bg-white"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            onOpenMediaLibrary((url) => {
                              const copy = [...data.slides];
                              copy[sIdx].image = url.replace(/\.(png|jpg|jpeg|webp)$/, "");
                              updateData("slides", copy);
                            })
                          }
                          className="px-2.5 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold"
                        >
                          Pick
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* HERO SPLIT & VIDEO */}
            {(section.type === "hero-split" || section.type === "hero-fullscreen" || section.type === "hero-video") && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Badge Text</label>
                  <input
                    type="text"
                    value={data.badge || ""}
                    onChange={(e) => updateData("badge", e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Main Heading</label>
                  <input
                    type="text"
                    value={data.heading || ""}
                    onChange={(e) => updateData("heading", e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Subheading</label>
                  <textarea
                    rows={3}
                    value={data.subheading || ""}
                    onChange={(e) => updateData("subheading", e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-1"
                  />
                </div>

                {section.type === "hero-split" && (
                  <div>
                    <label className="text-xs font-bold text-slate-700">Hero Image</label>
                    <div className="flex gap-2 mt-1">
                      <input
                        type="text"
                        value={data.imageUrl || ""}
                        onChange={(e) => updateData("imageUrl", e.target.value)}
                        className="flex-1 text-xs rounded-xl border border-slate-200 p-2"
                      />
                      <button
                        type="button"
                        onClick={() => onOpenMediaLibrary((url) => updateData("imageUrl", url))}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                      >
                        Media
                      </button>
                    </div>
                  </div>
                )}

                {section.type === "hero-video" && (
                  <div>
                    <label className="text-xs font-bold text-slate-700">Video URL (.mp4 or link)</label>
                    <input
                      type="text"
                      value={data.videoUrl || ""}
                      onChange={(e) => updateData("videoUrl", e.target.value)}
                      className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-1"
                    />
                  </div>
                )}

                {/* Primary & Secondary Buttons */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                  <div>
                    <label className="text-[11px] font-bold text-slate-600">Button 1 Label</label>
                    <input
                      type="text"
                      value={data.primaryBtn?.label || ""}
                      onChange={(e) =>
                        updateData("primaryBtn", { ...data.primaryBtn, label: e.target.value })
                      }
                      className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-0.5"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-600">Button 1 Link</label>
                    <input
                      type="text"
                      value={data.primaryBtn?.href || ""}
                      onChange={(e) =>
                        updateData("primaryBtn", { ...data.primaryBtn, href: e.target.value })
                      }
                      className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-0.5"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* MENTOR ABOUT SECTION */}
            {section.type === "mentor-about" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Section Badge</label>
                  <input
                    type="text"
                    value={data.headingBadge || ""}
                    onChange={(e) => updateData("headingBadge", e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Section Title</label>
                  <input
                    type="text"
                    value={data.title || ""}
                    onChange={(e) => updateData("title", e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">About Paragraph 1</label>
                  <textarea
                    rows={3}
                    value={data.paragraph1 || ""}
                    onChange={(e) => updateData("paragraph1", e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">About Paragraph 2</label>
                  <textarea
                    rows={3}
                    value={data.paragraph2 || ""}
                    onChange={(e) => updateData("paragraph2", e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Showcase Image</label>
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      value={data.image || ""}
                      onChange={(e) => updateData("image", e.target.value)}
                      className="flex-1 text-xs rounded-xl border border-slate-200 p-2"
                    />
                    <button
                      type="button"
                      onClick={() => onOpenMediaLibrary((url) => updateData("image", url))}
                      className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                    >
                      Media
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* MENTOR COUNTS (STATS) */}
            {section.type === "mentor-counts" && (
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-700">Stat Numbers & Labels</label>
                {data.stats?.map((stat: any, idx: number) => (
                  <div key={idx} className="flex gap-2 items-center">
                    <input
                      type="number"
                      value={stat.end}
                      onChange={(e) => {
                        const copy = [...data.stats];
                        copy[idx].end = parseInt(e.target.value) || 0;
                        updateData("stats", copy);
                      }}
                      className="w-24 text-xs rounded-xl border border-slate-200 p-2"
                      placeholder="Count"
                    />
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) => {
                        const copy = [...data.stats];
                        copy[idx].label = e.target.value;
                        updateData("stats", copy);
                      }}
                      className="flex-1 text-xs rounded-xl border border-slate-200 p-2"
                      placeholder="Label"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* RICH TEXT */}
            {section.type === "rich-text" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Title</label>
                  <input
                    type="text"
                    value={data.title || ""}
                    onChange={(e) => updateData("title", e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Subtitle</label>
                  <input
                    type="text"
                    value={data.subtitle || ""}
                    onChange={(e) => updateData("subtitle", e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-1"
                  />
                </div>
                <RichTextEditor
                  label="Formatted Body Text"
                  value={data.contentHtml || ""}
                  onChange={(val) => updateData("contentHtml", val)}
                />
              </div>
            )}

            {/* FAQS SECTION */}
            {section.type === "faqs" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">FAQ Questions ({data.items?.length || 0})</label>
                  <button
                    type="button"
                    onClick={() => {
                      const newItems = [
                        ...(data.items || []),
                        { q: "New Question Here?", a: "Detailed answer explaining the topic." },
                      ];
                      updateData("items", newItems);
                    }}
                    className="text-xs text-aec-teal font-bold hover:underline"
                  >
                    + Add Question
                  </button>
                </div>

                {data.items?.map((item: any, idx: number) => (
                  <div key={idx} className="p-3 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-700">Q#{idx + 1}</span>
                      <button
                        onClick={() => {
                          const copy = data.items.filter((_: any, i: number) => i !== idx);
                          updateData("items", copy);
                        }}
                        className="text-rose-500 text-xs hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                    <input
                      type="text"
                      value={item.q}
                      onChange={(e) => {
                        const copy = [...data.items];
                        copy[idx].q = e.target.value;
                        updateData("items", copy);
                      }}
                      className="w-full text-xs rounded-xl border border-slate-200 p-2 bg-white"
                      placeholder="Question"
                    />
                    <textarea
                      rows={2}
                      value={item.a}
                      onChange={(e) => {
                        const copy = [...data.items];
                        copy[idx].a = e.target.value;
                        updateData("items", copy);
                      }}
                      className="w-full text-xs rounded-xl border border-slate-200 p-2 bg-white"
                      placeholder="Answer"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* CTA BANNER */}
            {section.type === "cta-banner" && (
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-700">Heading</label>
                  <input
                    type="text"
                    value={data.heading || ""}
                    onChange={(e) => updateData("heading", e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Subheading</label>
                  <textarea
                    rows={2}
                    value={data.subheading || ""}
                    onChange={(e) => updateData("subheading", e.target.value)}
                    className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Button Label</label>
                  <input
                    type="text"
                    value={data.primaryBtn?.label || ""}
                    onChange={(e) =>
                      updateData("primaryBtn", { ...data.primaryBtn, label: e.target.value })
                    }
                    className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-1"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700">Button Link</label>
                  <input
                    type="text"
                    value={data.primaryBtn?.href || ""}
                    onChange={(e) =>
                      updateData("primaryBtn", { ...data.primaryBtn, href: e.target.value })
                    }
                    className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-1"
                  />
                </div>
              </div>
            )}

            {/* CUSTOM MULTI-COLUMN SECTION BUILDER */}
            {section.type === "custom" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-slate-700">Custom Layout Rows</label>
                  <button
                    type="button"
                    onClick={() => {
                      const newRow = {
                        id: `row-${Date.now()}`,
                        columns: [
                          {
                            id: `col-${Date.now()}-1`,
                            width: "col-span-12 md:col-span-6",
                            elements: [
                              { id: `el-${Date.now()}-1`, type: "heading", content: "New Heading", level: 3 },
                              { id: `el-${Date.now()}-2`, type: "paragraph", content: "Write custom copy here." }
                            ]
                          },
                          {
                            id: `col-${Date.now()}-2`,
                            width: "col-span-12 md:col-span-6",
                            elements: [
                              { id: `el-${Date.now()}-3`, type: "image", url: "/images/banner-1.png", alt: "New Visual" }
                            ]
                          }
                        ]
                      };
                      updateData("rows", [...(data.rows || []), newRow]);
                    }}
                    className="text-xs text-aec-teal font-bold hover:underline"
                  >
                    + Add Row
                  </button>
                </div>

                {data.rows?.map((row: any, rIdx: number) => (
                  <div key={row.id || rIdx} className="p-3 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-700">Row #{rIdx + 1} ({row.columns?.length || 0} cols)</span>
                      <button
                        onClick={() => {
                          const copy = data.rows.filter((_: any, i: number) => i !== rIdx);
                          updateData("rows", copy);
                        }}
                        className="text-rose-500 text-xs hover:underline"
                      >
                        Delete Row
                      </button>
                    </div>

                    {row.columns?.map((col: any, cIdx: number) => (
                      <div key={col.id || cIdx} className="p-2.5 rounded-xl border border-slate-200 bg-white space-y-2">
                        <span className="text-[10px] font-bold text-slate-400">Column #{cIdx + 1}</span>
                        {col.elements?.map((el: any, eIdx: number) => (
                          <div key={el.id || eIdx} className="space-y-1 pt-1 border-t border-slate-100">
                            <span className="text-[10px] font-semibold text-slate-500 uppercase">{el.type} element</span>
                            {el.type === "heading" && (
                              <input
                                type="text"
                                value={el.content || ""}
                                onChange={(e) => {
                                  const copyRows = [...data.rows];
                                  copyRows[rIdx].columns[cIdx].elements[eIdx].content = e.target.value;
                                  updateData("rows", copyRows);
                                }}
                                className="w-full text-xs rounded-lg border border-slate-200 p-1.5"
                              />
                            )}
                            {el.type === "paragraph" && (
                              <textarea
                                rows={2}
                                value={el.content || ""}
                                onChange={(e) => {
                                  const copyRows = [...data.rows];
                                  copyRows[rIdx].columns[cIdx].elements[eIdx].content = e.target.value;
                                  updateData("rows", copyRows);
                                }}
                                className="w-full text-xs rounded-lg border border-slate-200 p-1.5"
                              />
                            )}
                            {el.type === "image" && (
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={el.url || ""}
                                  onChange={(e) => {
                                    const copyRows = [...data.rows];
                                    copyRows[rIdx].columns[cIdx].elements[eIdx].url = e.target.value;
                                    updateData("rows", copyRows);
                                  }}
                                  className="flex-1 text-xs rounded-lg border border-slate-200 p-1.5"
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    onOpenMediaLibrary((url) => {
                                      const copyRows = [...data.rows];
                                      copyRows[rIdx].columns[cIdx].elements[eIdx].url = url;
                                      updateData("rows", copyRows);
                                    })
                                  }
                                  className="px-2 py-1 bg-slate-100 rounded text-xs font-bold"
                                >
                                  Pick
                                </button>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* DESIGN & STYLING TAB */
          <div className="space-y-5">
            <div>
              <label className="text-xs font-bold text-slate-700">Background Color</label>
              <div className="flex gap-2 mt-1 items-center">
                <input
                  type="color"
                  value={design.bgColor || "#ffffff"}
                  onChange={(e) => updateDesign("bgColor", e.target.value)}
                  className="w-9 h-9 p-1 rounded-xl border border-slate-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={design.bgColor || "#ffffff"}
                  onChange={(e) => updateDesign("bgColor", e.target.value)}
                  className="flex-1 text-xs rounded-xl border border-slate-200 p-2"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Text Color</label>
              <div className="flex gap-2 mt-1 items-center">
                <input
                  type="color"
                  value={design.textColor || "#0B1F3A"}
                  onChange={(e) => updateDesign("textColor", e.target.value)}
                  className="w-9 h-9 p-1 rounded-xl border border-slate-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={design.textColor || "#0B1F3A"}
                  onChange={(e) => updateDesign("textColor", e.target.value)}
                  className="flex-1 text-xs rounded-xl border border-slate-200 p-2"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Background Gradient</label>
              <input
                type="text"
                placeholder="e.g. linear-gradient(135deg, #0B1F3A 0%, #1e3a8a 100%)"
                value={design.bgGradient || ""}
                onChange={(e) => updateDesign("bgGradient", e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-1"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700">Background Image</label>
              <div className="flex gap-2 mt-1">
                <input
                  type="text"
                  value={design.bgImage || ""}
                  onChange={(e) => updateDesign("bgImage", e.target.value)}
                  className="flex-1 text-xs rounded-xl border border-slate-200 p-2"
                  placeholder="URL or select image"
                />
                <button
                  type="button"
                  onClick={() => onOpenMediaLibrary((url) => updateDesign("bgImage", url))}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold"
                >
                  Media
                </button>
              </div>
            </div>

            {/* Overlay toggle */}
            <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <p className="text-xs font-bold text-slate-800">Background Overlay</p>
                <p className="text-[11px] text-slate-500">Dark tint over background image/video</p>
              </div>
              <input
                type="checkbox"
                checked={design.bgOverlay || false}
                onChange={(e) => updateDesign("bgOverlay", e.target.checked)}
                className="w-4 h-4 rounded text-aec-teal"
              />
            </div>

            {design.bgOverlay && (
              <div>
                <div className="flex justify-between text-xs text-slate-600 mb-1">
                  <span>Overlay Opacity</span>
                  <span>{design.bgOverlayOpacity ?? 50}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={design.bgOverlayOpacity ?? 50}
                  onChange={(e) => updateDesign("bgOverlayOpacity", parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            )}

            {/* Padding Controls */}
            <div>
              <label className="text-xs font-bold text-slate-700">Vertical Spacing (Padding)</label>
              <select
                value={design.paddingTop || "py-14"}
                onChange={(e) => updateDesign("paddingTop", e.target.value)}
                className="w-full text-xs rounded-xl border border-slate-200 p-2 mt-1 bg-white"
              >
                <option value="py-6">Compact (py-6)</option>
                <option value="py-10">Normal (py-10)</option>
                <option value="py-14">Standard (py-14)</option>
                <option value="py-20">Spacious (py-20)</option>
                <option value="py-28">Extra Spacious (py-28)</option>
              </select>
            </div>

            {/* Text Alignment */}
            <div>
              <label className="text-xs font-bold text-slate-700">Text Alignment</label>
              <div className="grid grid-cols-3 gap-2 mt-1">
                {["left", "center", "right"].map((align) => (
                  <button
                    key={align}
                    type="button"
                    onClick={() => updateDesign("textAlign", align)}
                    className={`py-2 text-xs font-bold rounded-xl border capitalize transition ${
                      design.textAlign === align
                        ? "border-aec-navy bg-aec-navy text-white"
                        : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {align}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
