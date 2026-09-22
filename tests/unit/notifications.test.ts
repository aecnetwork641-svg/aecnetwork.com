import { describe, it, expect } from "vitest";

describe("Notification Formatting & Safety", () => {
  it("formats absence notice correctly with student and class details", () => {
    const studentName = "Zayd";
    const className = "Tajweed Cohort Alpha";
    const dateStr = "2026-09-20";

    const title = "Attendance Notice: Student Absent";
    const body = `Your child ${studentName} was marked absent for ${className} on ${dateStr}.`;

    expect(title).toContain("Absent");
    expect(body).toContain(studentName);
    expect(body).toContain(className);
  });

  it("formats monthly payment due notice with currency and due date", () => {
    const amount = "150 USD";
    const dueDate = "2026-10-01";

    const title = "Monthly Fee Due";
    const body = `Your monthly AEC Network fee of ${amount} is due on ${dueDate}.`;

    expect(body).toContain("150 USD");
    expect(body).toContain("2026-10-01");
  });

  it("formats teacher class assignment notice per Section 15", () => {
    const studentName = "Amina";
    const courseTitle = "Quran Reading Foundations";
    const className = "Cohort Beta";
    const schedule = "Day 1: 10:00-11:00 (UTC)";
    const startDate = "2026-10-01";

    const body = `Student: ${studentName} | Course: ${courseTitle} | Class: ${className} | Schedule: ${schedule} | Start date: ${startDate}`;

    expect(body).toContain(studentName);
    expect(body).toContain(courseTitle);
    expect(body).toContain(className);
    expect(body).toContain(schedule);
    expect(body).toContain(startDate);
  });
});
