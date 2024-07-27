import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk } from "@/lib/store";

interface Category {
  title: string;
  description: string;
  banner: string;
}

interface Module {
  title: string;
  description: string;
  banner: string;
}

interface Resource {
  fileName: string;
  url: string;
  isFile: boolean;
}

interface Video {
  title: string;
  description: string;
  author: string;
  url: string;
  resources: Resource[];
}

interface EducationState {
  categories: Category[];
  playlists: Record<string, Module[]>;
  videos: Record<string, Video[]>;
  status: "idle" | "loading" | "failed";
}

const initialState: EducationState = {
  categories: [],
  playlists: {},
  videos: {},
  status: "idle",
};

export const educationSlice = createSlice({
  name: "education",
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setPlaylists: (state, action: PayloadAction<Record<string, Module[]>>) => {
      state.playlists = action.payload;
    },
    setVideos: (state, action: PayloadAction<Record<string, Video[]>>) => {
      state.videos = action.payload;
    },
  },
  selectors: {
    selectCategories: (state) => state.categories,
    selectPlaylists: (state) => (categoryTitle: string) => state.playlists[categoryTitle] || [],
    selectVideos: (state) => (moduleTitle: string) => state.videos[moduleTitle] || [],
    selectVideoByTitle: (state) => (videoTitle: string, moduleTitle: string) => {
      for (const module in state.videos) {
        const video = state.videos[module].find((video) => video.title === videoTitle && moduleTitle === module);
        if (video) {
          return video;
        }
      }
      return null;
    },
  },
});

export const { setCategories, setPlaylists, setVideos } = educationSlice.actions;

export const { selectCategories, selectPlaylists, selectVideos, selectVideoByTitle } = educationSlice.selectors;

export const fetchEducationData =
  (data: any[], userMembership: string): AppThunk =>
  (dispatch) => {
    try {
      const categoriesMap = new Map();
      const playlistsMap = new Map();
      const videosMap = new Map();

      data.forEach((item) => {
        const category = item.category[0];
        const module = item.module[0];

        if (!categoriesMap.has(category.title)) {
          categoriesMap.set(category.title, {
            title: category.title,
            description: category.categoryDescription,
            banner: category.categoryBanner.url,
          });
        }

        if (!playlistsMap.has(category.title)) {
          playlistsMap.set(category.title, []);
        }

        if (!playlistsMap.get(category.title).some((mod: any) => mod.title === module.title)) {
          playlistsMap.get(category.title).push({
            title: module.title,
            description: module.moduleDescription,
            banner: module.moduleBanner.url,
          });
        }

        if (!videosMap.has(module.title)) {
          videosMap.set(module.title, []);
        }

        const resources = item.resources.map((resource: any) => ({
          fileName: resource.fileName,
          url: resource.resource ? resource.resource.url : resource.link,
          isFile: !!resource.resource,
        }));

        const membership = item.membership.map((member: any) => member.slug);

        videosMap.get(module.title).push({
          title: item.title,
          description: item.description,
          author: "Chainmind", // Assuming author is always "Chainmind" as in previous data
          url: membership.includes(userMembership) ? item.vemioUrl : "",
          resources: resources,
        });
      });

      const categories = Array.from(categoriesMap.values());
      const playlists = Object.fromEntries(playlistsMap);
      const videos = Object.fromEntries(videosMap);

      dispatch(setCategories(categories));
      dispatch(setPlaylists(playlists));
      dispatch(setVideos(videos));
    } catch (error) {
      console.error("Failed to process education data:", error);
    }
  };
