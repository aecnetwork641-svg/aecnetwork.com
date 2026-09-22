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
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-full bg-aec-blue px-4 py-3 text-sm font-bold text-white shadow-lg hover:bg-aec-blue/90 transition-transform active:scale-95"
        >
          <span>Ask AI Counselor</span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 rounded-xl border border-aec-navy/10 bg-white shadow-2xl flex flex-col h-[480px]">
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
              className="flex-1 rounded border border-aec-navy/20 px-3 py-1.5 text-xs text-aec-navy focus:border-aec-blue focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="rounded bg-aec-blue px-3 py-1.5 text-xs font-semibold text-white hover:bg-aec-blue/90 disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
