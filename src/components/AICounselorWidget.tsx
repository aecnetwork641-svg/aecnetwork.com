"use client";

import { useState } from "react";

export default function AICounselorWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: "user" | "ai"; text: string }>>([
    {
      sender: "ai",
      text: "As-salamu alaykum! I am your AEC AI Academic Counselor. How can I assist you with course selection, study planning, or admissions today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userQuery = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { sender: "user", text: userQuery }]);
    setLoading(true);

    try {
      const res = await fetch("/api/counselor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userQuery })
      });
      const data = await res.json();
      if (res.ok && data.reply) {
        setMessages((prev) => [...prev, { sender: "ai", text: data.reply }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { sender: "ai", text: data.error || "Unable to retrieve advice at this moment." }
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Network error. Please try again later." }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`fixed right-[22px] max-md:right-[14px] z-50 ${isOpen ? "bottom-[22px] max-md:bottom-[18px]" : "bottom-[104px] max-md:bottom-[86px]"}`}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-2 rounded-full bg-[#4DA3D9] hover:bg-[#0B1F3A] px-4 py-3 text-xs sm:text-sm font-bold text-white shadow-lg shadow-sky-950/20 hover:shadow-xl transition-all duration-300 active:scale-95"
          aria-label="Ask AI Counselor"
        >
          <svg className="w-5 h-5 fill-none stroke-current stroke-2 shrink-0" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
          </svg>
          <span>Ask AI Counselor</span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 rounded-xl border border-aec-navy/10 bg-white shadow-2xl flex flex-col h-[480px] max-h-[85vh]">
          {/* Header */}
          <div className="flex items-center justify-between bg-aec-navy px-4 py-3 rounded-t-xl text-white">
            <div>
              <p className="font-bold text-sm">AEC AI Counselor</p>
              <p className="text-[10px] text-white/70">Academic Guidance & Study Planning</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white text-lg font-bold"
            >
              &times;
            </button>
          </div>

          {/* Conversation history */}
          <div className="flex-1 p-3 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}
              >
                <div
                  className={`rounded-lg px-3 py-2 max-w-[85%] whitespace-pre-wrap ${
                    m.sender === "user"
                      ? "bg-aec-navy text-white"
                      : "bg-aec-navy/5 text-aec-navy border border-aec-navy/10"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <p className="text-[11px] text-aec-navy/40 italic">Counselor is typing verified guidance...</p>
            )}
          </div>

          {/* Input field */}
          <form onSubmit={handleSend} className="p-2 border-t border-aec-navy/10 flex gap-1.5">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about courses, fees, or trials..."
              className="flex-1 rounded border border-aec-navy/20 px-3 py-1.5 text-xs text-aec-navy focus:border-[#4DA3D9] focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded bg-[#4DA3D9] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#0B1F3A] disabled:opacity-50 transition"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
