export type DeviceView = "desktop" | "tablet" | "mobile";

export interface ButtonConfig {
  label: string;
  href: string;
  variant?: "primary" | "secondary" | "outline" | "gold" | "white";
  color?: string;
  bgColor?: string;
  textColor?: string;
  size?: "sm" | "md" | "lg";
  borderRadius?: string;
}

export interface SectionDesign {
  bgColor?: string;
  bgGradient?: string;
  bgImage?: string;
  bgVideo?: string;
  bgOverlay?: boolean;
  bgOverlayOpacity?: number; // 0 to 100
  textColor?: string;
  accentColor?: string;
  paddingTop?: string; // e.g. "py-16" or numeric/rem
  paddingBottom?: string;
  containerWidth?: "sm" | "md" | "lg" | "xl" | "full";
  textAlign?: "left" | "center" | "right";
  animation?: "none" | "fade" | "slide" | "zoom";
  customCssClass?: string;
}

export interface CustomElement {
  id: string;
  type: "heading" | "subheading" | "paragraph" | "image" | "video" | "button" | "icon" | "card" | "richText";
  content?: string;
  level?: 1 | 2 | 3 | 4;
  url?: string;
  alt?: string;
  width?: number;
  height?: number;
  buttons?: ButtonConfig[];
  style?: {
    color?: string;
    fontSize?: string;
    fontWeight?: string;
    textAlign?: "left" | "center" | "right";
    borderRadius?: string;
    bg?: string;
  };
}

export interface CustomColumn {
  id: string;
  width: string; // e.g. "col-span-12", "col-span-6", "col-span-4", etc.
  elements: CustomElement[];
}

export interface CustomRow {
  id: string;
  columns: CustomColumn[];
}

export interface SectionConfig {
  id: string;
  type: string; // "hero-slider" | "mentor-counts" | "mentor-about" | "popular-courses" | "one-to-one" | "pricing" | "what-sets-us-apart" | "scholar-team" | "faqs" | "cta-banner" | "custom" | etc.
  name: string; // user display name, e.g. "Main Hero Slider"
  category: "hero" | "content" | "education" | "media" | "marketing" | "utility" | "custom";
  isVisible: boolean;
  order: number;
  design?: SectionDesign;
  data: Record<string, any>;
}

export interface GlobalSettings {
  siteTitle?: string;
  tagline?: string;
  primaryColor?: string;
  secondaryColor?: string;
  accentColor?: string;
  fontFamily?: string;
  metaDescription?: string;
  ogImage?: string;
}

export interface PageBuilderState {
  sections: SectionConfig[];
  globalSettings: GlobalSettings;
  activeSectionId: string | null;
  deviceView: DeviceView;
  isSaving: boolean;
  isPublishing: boolean;
  hasUnsavedChanges: boolean;
  history: SectionConfig[][];
  historyIndex: number;
}
