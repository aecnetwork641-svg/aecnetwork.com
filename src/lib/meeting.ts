/**
 * Online Class meeting integration (section 8).
 *
 * Credentials for each meeting platform (Zoom, Google Meet, Microsoft
 * Teams) are NEVER hard-coded. They are read from environment variables
 * per-platform, and this module is the only place that should ever touch
 * them. Everything downstream (portals, API routes) calls
 * `getJoinLinkForClass()` instead of reading `class.meetingLink` directly,
 * so access control and link-masking stay centralized.
 */
import type { MeetingPlatform } from "@prisma/client";

export type MeetingPlatformConfig = {
  platform: MeetingPlatform;
  configured: boolean;
};

/**
 * Reports which platforms have credentials configured in this environment,
 * without ever returning the credentials themselves.
 */
export function getConfiguredPlatforms(): MeetingPlatformConfig[] {
  return [
    { platform: "ZOOM", configured: Boolean(process.env.ZOOM_API_KEY && process.env.ZOOM_API_SECRET) },
    { platform: "GOOGLE_MEET", configured: Boolean(process.env.GOOGLE_MEET_CLIENT_ID && process.env.GOOGLE_MEET_CLIENT_SECRET) },
    { platform: "MICROSOFT_TEAMS", configured: Boolean(process.env.TEAMS_CLIENT_ID && process.env.TEAMS_CLIENT_SECRET) },
    { platform: "OTHER", configured: true }
  ];
}

type ClassForMeeting = {
  id: string;
  meetingPlatform: MeetingPlatform;
  meetingLink: string | null;
};

type Viewer = {
  userId: string;
  role: string;
  // Caller must already have verified this viewer is the assigned teacher
  // or an enrolled student for this class (see workflows/enrollment.ts and
  // the portal query helpers) before calling this function.
  isAuthorizedForClass: boolean;
};

/**
 * Returns a join link only to a viewer already confirmed as the assigned
 * teacher or an enrolled student for the class. Never call this for a
 * public/unauthenticated context.
 */
export function getJoinLinkForClass(klass: ClassForMeeting, viewer: Viewer): string | null {
  if (!viewer.isAuthorizedForClass) return null;
  if (viewer.role !== "TEACHER" && viewer.role !== "STUDENT" && viewer.role !== "ADMIN" && viewer.role !== "SUPER_ADMIN") {
    return null;
  }
  return klass.meetingLink ?? null;
}

/**
 * Placeholder for platform-specific meeting creation. Wire this to the
 * Zoom / Google Meet / Microsoft Teams APIs using env-configured
 * credentials once a provider is chosen (see docs/ARCHITECTURE.md open
 * decisions). Must run server-side only.
 */
export async function createMeetingForClass(_params: {
  platform: MeetingPlatform;
  topic: string;
  startTime: Date;
  durationMinutes: number;
}): Promise<{ joinUrl: string } | { error: string }> {
  return { error: "Meeting provider not yet configured. Set platform credentials in .env and implement this function." };
}
