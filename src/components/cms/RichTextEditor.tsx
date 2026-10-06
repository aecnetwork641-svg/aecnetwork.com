"use client";

import React, { useRef, useEffect } from "react";
import {
  Bold,
  Italic,
  Underline,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Link as LinkIcon,
  Eraser,
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
}

export default function RichTextEditor({
  value,
  onChange,
  label,
  placeholder = "Type your content here...",
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);

  // Sync external value to contentEditable on initial mount or when radically changed
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const exec = (command: string, arg?: string) => {
    document.execCommand(command, false, arg);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const addLink = () => {
    const url = prompt("Enter URL:", "https://");
    if (url) {
      exec("createLink", url);
    }
  };

  return (
    <div className="space-y-1.5">
      {label && <label className="text-xs font-bold text-slate-700">{label}</label>}
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs focus-within:border-aec-teal focus-within:ring-1 focus-within:ring-aec-teal">
        {/* Formatting Toolbar */}
        <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-50 border-b border-slate-200">
          <button
            type="button"
            onClick={() => exec("bold")}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 transition"
            title="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("italic")}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 transition"
            title="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("underline")}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 transition"
            title="Underline"
          >
            <Underline className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-[1px] bg-slate-300 mx-1" />

          <button
            type="button"
            onClick={() => exec("formatBlock", "<h1>")}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 transition"
            title="Heading 1"
          >
            <Heading1 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("formatBlock", "<h2>")}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 transition"
            title="Heading 2"
          >
            <Heading2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("formatBlock", "<p>")}
            className="px-2 py-1 text-[11px] font-bold rounded-lg text-slate-600 hover:bg-slate-200 transition"
            title="Paragraph"
          >
            P
          </button>

          <div className="h-4 w-[1px] bg-slate-300 mx-1" />

          <button
            type="button"
            onClick={() => exec("justifyLeft")}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 transition"
            title="Align Left"
          >
            <AlignLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("justifyCenter")}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 transition"
            title="Align Center"
          >
            <AlignCenter className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("justifyRight")}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 transition"
            title="Align Right"
          >
            <AlignRight className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-[1px] bg-slate-300 mx-1" />

          <button
            type="button"
            onClick={() => exec("insertUnorderedList")}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 transition"
            title="Bullet List"
          >
            <List className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => exec("insertOrderedList")}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 transition"
            title="Numbered List"
          >
            <ListOrdered className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={addLink}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 transition"
            title="Add Link"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>

          <div className="h-4 w-[1px] bg-slate-300 mx-1" />

          <button
            type="button"
            onClick={() => exec("removeFormat")}
            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 transition"
            title="Clear Formatting"
          >
            <Eraser className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Editable Content Area */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="p-3.5 min-h-[120px] max-h-[300px] overflow-y-auto text-xs sm:text-sm text-slate-800 leading-relaxed focus:outline-none prose prose-slate"
          style={{ wordBreak: "break-word" }}
        />
      </div>
    </div>
  );
}
