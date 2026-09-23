"use client";

import { useState } from "react";
import PortalShell from "@/components/PortalShell";
import { PARENT_NAV } from "../_nav";

export default function ParentMessagesPage() {
  const [messages, setMessages] = useState([
    {
      id: "pmsg-1",
      sender: "Academic Coordinator (AEC Network)",
      text: "Assalam-o-Alaikum Brother Muhammad Akbar. Both Abdullah and Fatima are demonstrating exceptional consistency. If you have any schedule adjustments for the upcoming month, please let us know.",
      time: "Yesterday at 4:00 PM",
      isAdmin: true,
    },
    {
      id: "pmsg-2",
      sender: "You",
      text: "Wa alaykum assalam. We are very satisfied with Ustadh Qasim and Ustaza Maryam's teaching. The current timings work perfectly for us.",
      time: "Today at 9:00 AM",
      isAdmin: false,
    },
  ]);

  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        id: "pmsg-" + Date.now(),
        sender: "You",
        text: input.trim(),
        time: "Just now",
        isAdmin: false,
      },
    ]);
    setInput("");
  };

  return (
    <PortalShell role="Parent Portal" navItems={PARENT_NAV} title="School Administration & Counselor Communications">
      <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm flex flex-col h-[540px]">
        {/* Header */}
        <div className="bg-aec-navy p-4 text-white flex items-center justify-between">
          <div>
            <h3 className="font-display text-sm font-bold">AEC Academic Counseling Desk</h3>
            <p className="text-[11px] text-white/70">Official Parent Communication Channel</p>
          </div>
          <a
            href="https://wa.me/923435999397"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-[#25D366] text-white px-3 py-1.5 text-xs font-bold transition flex items-center gap-1.5"
          >
            <span>WhatsApp (+92 343 5999397)</span>
          </a>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((m) => (
            <div key={m.id} className={`flex flex-col ${m.isAdmin ? "items-start" : "items-end"}`}>
              <div className="text-[10px] text-slate-400 mb-1 px-1">{m.sender} • {m.time}</div>
              <div
                className={`p-3.5 rounded-2xl max-w-[80%] text-xs leading-relaxed shadow-sm ${
                  m.isAdmin
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
            placeholder="Type your message to Academic Administration..."
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
