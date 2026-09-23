"use client";

import { useState } from "react";
import PortalShell from "@/components/PortalShell";
import { STUDENT_NAV } from "../_nav";

export default function StudentMessagesPage() {
  const [messages, setMessages] = useState([
    {
      id: "msg-1",
      sender: "Ustadh Muhammad Qasim",
      role: "Quran & Tajweed Instructor",
      text: "Assalam-o-Alaikum Abdullah. Please prepare Surah Al-Mulk ayat 1-10 for our upcoming oral evaluation on Friday.",
      time: "Yesterday at 6:15 PM",
      isTeacher: true,
    },
    {
      id: "msg-2",
      sender: "You",
      role: "Student",
      text: "Wa alaykum assalam Ustadh. I have practiced the Makharij for letters Qaaf and Ghain as advised. I will submit the recording today.",
      time: "Today at 10:30 AM",
      isTeacher: false,
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        id: "msg-" + Date.now(),
        sender: "You",
        role: "Student",
        text: input.trim(),
        time: "Just now",
        isTeacher: false,
      },
    ]);
    setInput("");
  };

  return (
    <PortalShell role="Student Portal" navItems={STUDENT_NAV} title="Teacher Communications & Chat">
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col h-[560px]">
        {/* Chat Header */}
        <div className="bg-aec-navy p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-aec-gold text-aec-navy font-bold text-sm">
              MQ
            </div>
            <div>
              <h3 className="font-display text-sm font-bold">Ustadh Muhammad Qasim</h3>
              <p className="text-[11px] text-white/70">Assigned Instructor • Online</p>
            </div>
          </div>
          <a
            href="https://wa.me/923435999397"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5"
          >
            <span>WhatsApp Connect</span>
          </a>
        </div>

        {/* Message Thread */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.isTeacher ? "items-start" : "items-end"}`}>
              <div className="text-[10px] text-slate-400 mb-1 px-1">
                {m.sender} • {m.time}
              </div>
              <div
                className={`p-3.5 rounded-2xl max-w-[80%] text-xs leading-relaxed shadow-sm ${
                  m.isTeacher
                    ? "bg-white text-slate-900 border border-slate-200"
                    : "bg-aec-navy text-white"
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message to Ustadh..."
            className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-xs text-slate-900 focus:border-aec-navy focus:outline-none"
          />
          <button type="submit" className="btn-primary text-xs px-5 py-2.5">
            Send Message
          </button>
        </form>
      </div>
    </PortalShell>
  );
}
