"use client";

import React, { useState } from "react";
import { SECTION_TEMPLATES, TemplateDefinition } from "@/lib/cms-templates";
import {
  Layers,
  Sparkles,
  Sliders,
  Video,
  Columns,
  Maximize,
  Info,
  BarChart3,
  CheckCircle2,
  FileText,
  GraduationCap,
  UserCheck,
  Image,
  Quote,
  CreditCard,
  Megaphone,
  Mail,
  Users,
  HelpCircle,
  PhoneCall,
  X,
  Search,
} from "lucide-react";

interface SectionLibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: TemplateDefinition) => void;
  onOpenCustomBuilder: () => void;
}

const CATEGORIES = [
  { id: "all", label: "All Templates" },
  { id: "hero", label: "Hero Banners" },
  { id: "content", label: "Content & About" },
  { id: "education", label: "Education & Courses" },
  { id: "media", label: "Media & Galleries" },
  { id: "marketing", label: "Marketing & CTA" },
  { id: "utility", label: "Utility & FAQs" },
  { id: "custom", label: "Custom Builder" },
];

export default function SectionLibraryModal({
  isOpen,
  onClose,
  onSelectTemplate,
  onOpenCustomBuilder,
}: SectionLibraryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");

  if (!isOpen) return null;

  const filteredTemplates = SECTION_TEMPLATES.filter((tmpl) => {
    const matchesCat = selectedCategory === "all" || tmpl.category === selectedCategory;
    const matchesSearch =
      tmpl.name.toLowerCase().includes(search.toLowerCase()) ||
      tmpl.description.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Sliders": return <Sliders className="w-5 h-5" />;
      case "Video": return <Video className="w-5 h-5" />;
      case "Columns": return <Columns className="w-5 h-5" />;
      case "Maximize": return <Maximize className="w-5 h-5" />;
      case "Info": return <Info className="w-5 h-5" />;
      case "BarChart3": return <BarChart3 className="w-5 h-5" />;
      case "CheckCircle2": return <CheckCircle2 className="w-5 h-5" />;
      case "FileText": return <FileText className="w-5 h-5" />;
      case "GraduationCap": return <GraduationCap className="w-5 h-5" />;
      case "UserCheck": return <UserCheck className="w-5 h-5" />;
      case "Image": return <Image className="w-5 h-5" />;
      case "Quote": return <Quote className="w-5 h-5" />;
      case "CreditCard": return <CreditCard className="w-5 h-5" />;
      case "Megaphone": return <Megaphone className="w-5 h-5" />;
      case "Mail": return <Mail className="w-5 h-5" />;
      case "Users": return <Users className="w-5 h-5" />;
      case "HelpCircle": return <HelpCircle className="w-5 h-5" />;
      case "PhoneCall": return <PhoneCall className="w-5 h-5" />;
      default: return <Layers className="w-5 h-5" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="relative flex flex-col w-full max-w-5xl h-[85vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-aec-teal text-white">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Section Library & Pre-built Templates</h2>
              <p className="text-xs text-slate-500">
                Choose a professional responsive section layout to insert onto your homepage
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories & Search */}
        <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                  selectedCategory === cat.id
                    ? "bg-aec-navy text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-aec-teal w-48 sm:w-60"
            />
          </div>
        </div>

        {/* Template Grid */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50/50">
          {/* Custom Section Quick Banner */}
          <div className="mb-6 rounded-2xl bg-gradient-to-r from-aec-navy to-slate-800 p-5 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-aec-teal/20 text-aec-teal text-[11px] font-bold uppercase tracking-wider mb-1">
                <Layers className="w-3.5 h-3.5" />
                <span>Full Layout Freedom</span>
              </div>
              <h3 className="text-base font-bold">Build a Custom Section from Scratch</h3>
              <p className="text-xs text-slate-300 mt-0.5">
                Add rows, multi-column layouts, custom headings, text, media, buttons, and embeds.
              </p>
            </div>
            <button
              onClick={() => {
                onOpenCustomBuilder();
                onClose();
              }}
              className="px-5 py-2.5 rounded-xl bg-aec-teal hover:bg-aec-teal/90 text-white text-xs font-bold shadow-md transition whitespace-nowrap"
            >
              + Create Custom Section
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTemplates.map((template) => (
              <div
                key={template.type}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 hover:border-aec-teal hover:shadow-md transition duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="p-2.5 rounded-xl bg-slate-100 text-aec-navy group-hover:bg-aec-teal group-hover:text-white transition">
                      {getIcon(template.iconName)}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {template.category}
                    </span>
                  </div>
                  <h4 className="font-display text-sm font-bold text-slate-900 group-hover:text-aec-teal transition">
                    {template.name}
                  </h4>
                  <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">
                    {template.description}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-medium">Ready to insert</span>
                  <button
                    onClick={() => {
                      onSelectTemplate(template);
                      onClose();
                    }}
                    className="px-3.5 py-1.5 rounded-xl bg-slate-100 hover:bg-aec-navy hover:text-white text-slate-700 text-xs font-bold transition"
                  >
                    + Insert Section
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
