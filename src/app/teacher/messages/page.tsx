import PortalShell from "@/components/PortalShell";
import ScopedDataNote from "@/components/ScopedDataNote";
import { TEACHER_NAV } from "../_nav";
import { getCurrentTeacherScope } from "@/lib/scoped-queries";
import { prisma } from "@/lib/prisma";

export default async function TeacherMessagesPage() {
  const scope = await getCurrentTeacherScope();

  // Find messages where this user is sender or receiver
  const messages = scope
    ? await prisma.message.findMany({
        where: {
          OR: [
            { senderId: scope.userId },
            { receiverId: scope.userId }
          ]
        },
        include: {
          sender: true,
          receiver: true
        },
        orderBy: { createdAt: "desc" },
        take: 30
      })
    : [];

  return (
    <PortalShell role="Teacher Portal" navItems={TEACHER_NAV} title="Messages & Direct Communication">
      <div className="flex items-center justify-between">
        <p className="text-sm text-aec-navy/70">
          Direct messaging with your assigned students, their parents, and academic administration.
        </p>
        <ScopedDataNote text="Conversations are private and scoped strictly to your account." />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-1">
          <h3 className="font-bold text-aec-navy text-sm border-b border-aec-navy/10 pb-3">
            Inbox Threads
          </h3>
          {messages.length === 0 ? (
            <p className="py-8 text-center text-xs text-aec-navy/50">No active message threads.</p>
          ) : (
            <div className="mt-2 divide-y divide-aec-navy/5">
              {messages.map((m) => {
                const isSentByMe = m.senderId === scope?.userId;
                const contact = isSentByMe ? m.receiver : m.sender;
                return (
                  <div key={m.id} className="py-2.5 hover:bg-aec-navy/5 p-2 rounded cursor-pointer">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-xs text-aec-navy">{contact.name}</p>
                      <span className="text-[10px] text-aec-navy/40">
                        {m.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <p className="text-xs text-aec-navy/60 truncate mt-0.5">{m.body}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="card lg:col-span-2 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-aec-navy text-sm border-b border-aec-navy/10 pb-3">
              Conversation Thread
            </h3>
            {messages.length === 0 ? (
              <div className="py-16 text-center text-sm text-aec-navy/50">
                Select a contact or send a message to an assigned student or parent.
              </div>
            ) : (
              <div className="mt-4 space-y-3 max-h-[400px] overflow-y-auto p-2">
                {messages.slice().reverse().map((m) => {
                  const isSentByMe = m.senderId === scope?.userId;
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isSentByMe ? "items-end" : "items-start"}`}
                    >
                      <span className="text-[10px] text-aec-navy/40 mb-0.5">
                        {isSentByMe ? "You" : m.sender.name} &bull; {m.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </span>
                      <div
                        className={`rounded-lg px-3 py-2 text-xs max-w-md ${
                          isSentByMe
                            ? "bg-aec-navy text-white"
                            : "bg-aec-navy/10 text-aec-navy"
                        }`}
                      >
                        {m.body}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="mt-6 border-t border-aec-navy/10 pt-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type a message to student or parent..."
                className="flex-1 rounded border border-aec-navy/20 px-3 py-2 text-xs text-aec-navy focus:border-aec-blue focus:outline-none"
              />
              <button
                type="button"
                className="rounded bg-aec-blue px-4 py-2 text-xs font-semibold text-white hover:bg-aec-blue/90"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </PortalShell>
  );
}
