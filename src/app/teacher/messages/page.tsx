"use client";

import { useState } from "react";
import PortalShell from "@/components/PortalShell";
import { TEACHER_NAV } from "../_nav";

export default function TeacherMessagesPage() {
  const [messages, setMessages] = useState([
    {
      id: "tmsg-1",
      sender: "Abdullah Akbar (Student)",
      text: "Assalam-o-Alaikum Ustadh. I have submitted my Surah Al-Mulk recitation audio. Please evaluate when convenient.",
      time: "Today at 10:30 AM",
      isStudent: true,
    },
    {
      id: "tmsg-2",
      sender: "You",
      text: "Wa alaykum assalam Abdullah. Excellent, I am reviewing your recording now.",
      time: "Today at 11:00 AM",
      isStudent: false,
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        id: "tmsg-" + Date.now(),
        sender: "You",
        text: input.trim(),
        time: "Just now",
        isStudent: false,
      },
    ]);
    setInput("");
  };

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Student & Parent Communications">
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col h-[540px]">
        {/* Chat Header */}
        <div className="bg-aec-navy p-4 text-white flex items-center justify-between">
          <div>
            <h3 className="font-display text-sm font-bold">Student Chat: Abdullah Akbar</h3>
            <p className="text-[11px] text-white/70">Quran Recitation & Applied Tajweed</p>
          </div>
          <a
            href="https://wa.me/923435999397"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#25D366] text-white px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5"
          >
            <span>WhatsApp Contact</span>
          </a>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.isStudent ? "items-start" : "items-end"}`}>
              <div className="text-[10px] text-slate-400 mb-1 px-1">{m.sender} • {m.time}</div>
              <div
                className={`p-3.5 rounded-2xl max-w-[80%] text-xs leading-relaxed shadow-sm ${
                  m.isStudent
                    ? "bg-white text-slate-900 border border-slate-200"
                    : "bg-aec-navy text-white"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type guidance message to student/parent..."
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:border-aec-navy focus:outline-none"
          />
          <button type="submit" className="btn-primary text-xs px-5 py-2.5">
            Send Reply
          </button>
        </form>
      </div>
    </PortalShell>
  );
}
