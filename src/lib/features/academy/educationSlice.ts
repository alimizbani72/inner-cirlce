// features/academy/educationSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppThunk } from "@/lib/store";

interface Category {
  title: string;
  description: string;
}

interface Module {
  title: string;
  description: string;
}

interface Video {
  title: string;
  description: string;
  author: string;
  URL: string;
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
  (data: any[]): AppThunk =>
  (dispatch) => {
    try {
      const categories: Category[] = [
        ...new Map(
          data.map((item) => [item.Category, { title: item.Category, description: item["Category Description"] }])
        ).values(),
      ];

      const playlists: Record<string, Module[]> = {};
      data.forEach((item) => {
        const key = item.Category;
        if (!playlists[key]) {
          playlists[key] = [];
        }
        const moduleTitle = item.module;
        if (!playlists[key].some((module) => module.title === moduleTitle)) {
          playlists[key].push({
            title: moduleTitle,
            description: item["module description"],
          });
        }
      });

      const videos: Record<string, Video[]> = {};
      data.forEach((item) => {
        const key = item.module;
        if (!videos[key]) {
          videos[key] = [];
        }
        videos[key].push({
          title: item["video title"],
          description: item["video description"],
          author: item["video author"],
          URL: item["video vimeo url"],
        });
      });

      dispatch(setCategories(categories));
      dispatch(setPlaylists(playlists));
      dispatch(setVideos(videos));
    } catch (error) {
      console.error("Failed to process education data:", error);
    }
  };

export default educationSlice.reducer;
