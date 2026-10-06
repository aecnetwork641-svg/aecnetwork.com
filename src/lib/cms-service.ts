import { prisma } from "./prisma";
import { DEFAULT_HOMEPAGE_SECTIONS, DEFAULT_GLOBAL_SETTINGS } from "./cms-defaults";
import { SectionConfig, GlobalSettings } from "./cms-types";

export interface GetHomepageDataResult {
  sections: SectionConfig[];
  globalSettings: GlobalSettings;
  isDraft: boolean;
  version?: number;
}

/**
 * Loads published sections for the public homepage.
 * If no record exists yet, auto-initializes the database with defaults.
 */
export async function getPublishedHomepage(): Promise<GetHomepageDataResult> {
  try {
    let config = await prisma.pageConfig.findUnique({
      where: { slug: "home" },
    });

    if (!config) {
      config = await prisma.pageConfig.create({
        data: {
          slug: "home",
          title: "Homepage",
          publishedContent: DEFAULT_HOMEPAGE_SECTIONS as any,
          draftContent: DEFAULT_HOMEPAGE_SECTIONS as any,
          globalSettings: DEFAULT_GLOBAL_SETTINGS as any,
          isPublished: true,
        },
      });

      // Also create an initial revision
      await prisma.pageRevision.create({
        data: {
          pageConfigId: config.id,
          version: 1,
          note: "Initial system default",
          sections: DEFAULT_HOMEPAGE_SECTIONS as any,
          createdBy: "system",
        },
      });
    }

    const sections = (config.publishedContent as unknown as SectionConfig[]) || DEFAULT_HOMEPAGE_SECTIONS;
    const globalSettings = (config.globalSettings as unknown as GlobalSettings) || DEFAULT_GLOBAL_SETTINGS;

    return {
      sections,
      globalSettings,
      isDraft: false,
    };
  } catch (error) {
    console.error("[CMS_GET_PUBLISHED_HOMEPAGE_ERROR]", error);
    return {
      sections: DEFAULT_HOMEPAGE_SECTIONS,
      globalSettings: DEFAULT_GLOBAL_SETTINGS,
      isDraft: false,
    };
  }
}

/**
 * Loads draft sections for the Super Admin Homepage Builder.
 */
export async function getDraftHomepage(): Promise<GetHomepageDataResult> {
  try {
    let config = await prisma.pageConfig.findUnique({
      where: { slug: "home" },
    });

    if (!config) {
      config = await prisma.pageConfig.create({
        data: {
          slug: "home",
          title: "Homepage",
          publishedContent: DEFAULT_HOMEPAGE_SECTIONS as any,
          draftContent: DEFAULT_HOMEPAGE_SECTIONS as any,
          globalSettings: DEFAULT_GLOBAL_SETTINGS as any,
          isPublished: true,
        },
      });
    }

    const sections = (config.draftContent as unknown as SectionConfig[]) || DEFAULT_HOMEPAGE_SECTIONS;
    const globalSettings = (config.globalSettings as unknown as GlobalSettings) || DEFAULT_GLOBAL_SETTINGS;

    return {
      sections,
      globalSettings,
      isDraft: true,
    };
  } catch (error) {
    console.error("[CMS_GET_DRAFT_HOMEPAGE_ERROR]", error);
    return {
      sections: DEFAULT_HOMEPAGE_SECTIONS,
      globalSettings: DEFAULT_GLOBAL_SETTINGS,
      isDraft: true,
    };
  }
}
