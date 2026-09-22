"use client";

import { useState } from "react";
import { submitClassAttendance, AttendanceEntry } from "./actions";

interface StudentInfo {
  id: string;
  name: string;
  code: string;
  currentStatus?: string;
  note?: string;
}

interface Props {
  classId: string;
  className: string;
  initialDate: string;
  students: StudentInfo[];
}

export default function AttendanceMarker({
  classId,
  className,
  initialDate,
  students
}: Props) {
  const [date, setDate] = useState(initialDate);
  const [statuses, setStatuses] = useState<Record<string, "present" | "absent" | "late" | "excused">>(() => {
    const initial: Record<string, "present" | "absent" | "late" | "excused"> = {};
    students.forEach((s) => {
      initial[s.id] = (s.currentStatus as any) || "present";
    });
    return initial;
  });
  const [notes, setNotes] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    students.forEach((s) => {
      if (s.note) initial[s.id] = s.note;
    });
    return initial;
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const setAll = (status: "present" | "absent" | "late" | "excused") => {
    const updated: Record<string, "present" | "absent" | "late" | "excused"> = {};
    students.forEach((s) => {
      updated[s.id] = status;
    });
    setStatuses(updated);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const entries: AttendanceEntry[] = students.map((s) => ({
      studentId: s.id,
      status: statuses[s.id] || "present",
      note: notes[s.id] || undefined
    }));

    try {
      const res = await submitClassAttendance(classId, date, entries);
      setMessage(`Successfully saved attendance for ${res.count} students. (Absence alerts dispatched where applicable)`);
    } catch (err: any) {
      setMessage(`Error: ${err.message || "Could not save attendance"}`);
    } finally {
      setSaving(false);
    }
  };

  if (students.length === 0) {
    return (
      <div className="card py-8 text-center text-sm text-aec-navy/50">
        No students currently rostered in this class.
      </div>
    );
  }

  return (
    <form onSubmit={handleSave} className="card">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-aec-navy/10 pb-4">
        <div>
          <h3 className="font-bold text-aec-navy text-base">{className} — Mark Attendance</h3>
          <p className="text-xs text-aec-navy/60">
            Select statuses for each student. Marking &quot;Absent&quot; will automatically notify their parent.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <label className="text-xs font-semibold text-aec-navy">Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded border border-aec-navy/20 px-3 py-1.5 text-xs text-aec-navy focus:border-aec-blue focus:outline-none"
          />
        </div>
      </div>

      {/* Quick bulk action */}
      <div className="mt-4 flex items-center gap-2">
        <span className="text-xs text-aec-navy/60">Quick mark all:</span>
        <button
          type="button"
          onClick={() => setAll("present")}
          className="rounded bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 hover:bg-emerald-100"
        >
          All Present
        </button>
        <button
          type="button"
          onClick={() => setAll("absent")}
          className="rounded bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 hover:bg-rose-100"
        >
          All Absent
        </button>
      </div>

      {message && (
        <div className="mt-4 rounded bg-aec-blue/10 p-3 text-xs text-aec-navy font-medium">
          {message}
        </div>
      )}

      {/* Student Roster Table */}
      <div className="mt-4 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-aec-navy/10 text-xs uppercase text-aec-navy/50">
              <th className="py-2.5 px-2">Student</th>
              <th className="py-2.5 px-2">Code</th>
              <th className="py-2.5 px-2">Status</th>
              <th className="py-2.5 px-2">Teacher Note</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-aec-navy/5">
            {students.map((s) => (
              <tr key={s.id} className="hover:bg-aec-navy/[0.02]">
                <td className="py-3 px-2 font-medium text-aec-navy">{s.name}</td>
                <td className="py-3 px-2 text-xs font-mono text-aec-navy/60">{s.code}</td>
                <td className="py-3 px-2">
                  <div className="flex items-center gap-2">
                    {(["present", "absent", "late", "excused"] as const).map((st) => (
                      <label
                        key={st}
                        className={`cursor-pointer rounded px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
                          statuses[s.id] === st
                            ? st === "present"
                              ? "bg-emerald-600 text-white"
                              : st === "absent"
                              ? "bg-rose-600 text-white"
                              : st === "late"
                              ? "bg-amber-500 text-white"
                              : "bg-blue-600 text-white"
                            : "bg-aec-navy/5 text-aec-navy/70 hover:bg-aec-navy/10"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`status-${s.id}`}
                          value={st}
                          checked={statuses[s.id] === st}
                          onChange={() =>
                            setStatuses((prev) => ({ ...prev, [s.id]: st }))
                          }
                          className="sr-only"
                        />
                        {st}
                      </label>
                    ))}
                  </div>
                </td>
                <td className="py-3 px-2">
                  <input
                    type="text"
                    placeholder="Optional remark..."
                    value={notes[s.id] || ""}
                    onChange={(e) =>
                      setNotes((prev) => ({ ...prev, [s.id]: e.target.value }))
                    }
                    className="w-full rounded border border-aec-navy/20 px-2.5 py-1 text-xs text-aec-navy focus:border-aec-blue focus:outline-none"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 flex justify-end border-t border-aec-navy/10 pt-4">
        <button
          type="submit"
          disabled={saving}
          className="rounded bg-aec-navy px-5 py-2 text-xs font-semibold text-white hover:bg-aec-navy/90 disabled:opacity-50"
        >
          {saving ? "Saving & Notifying..." : "Save Class Attendance"}
        </button>
      </div>
    </form>
  );
}
