import { customInstance } from "@/scripts/fetcher";
import { useQuery } from "@tanstack/react-query";

export const useMe = () => {
  return useQuery({
    queryKey: ["/auth/me"],
    queryFn: () => customInstance({ url: "/auth/me" }),
  });
};

export const useSocialMedia = () => {
  return useQuery({
    queryKey: ["/global-socialmedia"],
    queryFn: () => customInstance({ url: "/global-socialmedia" }),
  });
};

export const useRoadmaps = () => {
  return useQuery({
    queryKey: ["/roadmaps"],
    queryFn: () => customInstance({ url: "/roadmaps" }),
  });
};

export const useLiveFeed = () => {
  return useQuery({
    queryKey: ["/global-livefeed"],
    queryFn: () => customInstance({ url: "/global-livefeed" }),
  });
};

export const useAffiliateMe = () => {
  return useQuery({
    queryKey: ["/affiliate/me"],
    queryFn: () => customInstance({ url: "/affiliate/me" }),
  });
};

export const useItems = () => {
  return useQuery({
    queryKey: ["/items"],
    queryFn: () => customInstance({ url: "/items" }),
  });
};

export const useActivePayment = () => {
  return useQuery({
    queryKey: ["/financial/payments/active"],
    queryFn: () => customInstance({ url: "/financial/payments/active" }),
  });
};

export const useGlobalsSocialMedia = () => {
  return useQuery({
    queryKey: ["/global-socialmedia"],
    queryFn: () =>
      customInstance({
        url: "/global-socialmedia",
      }),
  });
};

export const useGlobalsVideoGlobal = () => {
  return useQuery({
    queryKey: ["/global-video-global"],
    queryFn: () =>
      customInstance({
        url: "/global-video-global",
      }),
  });
};

export const useGlobalsLiveFeed = () => {
  return useQuery({
    queryKey: ["/global-livefeed"],
    queryFn: () =>
      customInstance({
        url: "/global-livefeed",
      }),
  });
};
export const useGlobalsAffiliateHowItWorks = () => {
  return useQuery({
    queryKey: ["/affiliate/how-it-works"],
    queryFn: () =>
      customInstance({
        url: "/affiliate/how-it-works",
      }),
  });
};

export const useGlobalsDropZone = () => {
  return useQuery({
    queryKey: ["/global-dropzone"],
    queryFn: () =>
      customInstance({
        url: "/global-dropzone",
      }),
  });
};
