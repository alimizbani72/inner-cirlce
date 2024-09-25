"use client";

import ContentStack from "@app/_components/ContentStack";
import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import RoadMapItem from "./Item";
import { useTranslate } from "@/locales";
import Scrollbar from "@/components/Scrollbar";
const roadmapData = [
  {
    id: 1,
    title: "Launch ChainMind Mobile App",
    date: "March, 2024",
    status: "In Progress",
    modal: {
      image: "/assets/png/roadmapimg.png",
      descriptionText:
        "TOne of these tunnels directs traffic through the VPN server, while the other bypasses the VPN and goes directly to the Internet service provider (ISP).",
      descriptionPoints: ["Seamless VPN integration", "Support for multiple blockchains"],
      additionalDescription:
        "Ultimately, this means that users can choose which apps or websites go through the VPN and which ones don’t, providing more control over how their online activity is shared.",
    },
  },
  {
    id: 2,
    title: "Launch ChainMind Web App",
    date: "March, 2023",
    status: "Planned",
    modal: {
      image: "/assets/png/roadmapimg.png",
      descriptionText:
        "One of these tunnels directs traffic through the VPN server, while the other bypasses the VPN and goes directly to the Internet service provider (ISP).",
      descriptionPoints: ["Easy access to decentralized tools", "Cross-platform compatibility"],
      additionalDescription:
        "Ultimately, this means that users can choose which apps or websites go through the VPN and which ones don’t, providing more control over how their online activity is shared.",
    },
  },
  {
    id: 3,
    title: "Launch ChainMind Desktop App",
    date: "March, 2025",
    status: "Completed",
    modal: {
      image: "/assets/png/roadmapimg.png",
      descriptionText:
        "One of these tunnels directs traffic through the VPN server, while the other bypasses the VPN and goes directly to the Internet service provider (ISP).",
      descriptionPoints: ["Secure multi-asset wallet", "High-speed transactions"],
      additionalDescription:
        "Ultimately, this means that users can choose which apps or websites go through the VPN and which ones don’t, providing more control over how their online activity is shared.",
    },
  },
  {
    id: 4,
    title: "Launch ChainMind Desktop App",
    date: "March, 2025",
    status: "Future",
    modal: {
      image: "/assets/png/roadmapimg.png",
      descriptionText:
        "One of these tunnels directs traffic through the VPN server, while the other bypasses the VPN and goes directly to the Internet service provider (ISP).",
      descriptionPoints: ["Secure multi-asset wallet", "High-speed transactions"],
      additionalDescription:
        "Ultimately, this means that users can choose which apps or websites go through the VPN and which ones don’t, providing more control over how their online activity is shared.",
    },
  },
];
interface RoadMapProps {}

const RoadMap: FC<RoadMapProps> = () => {
  // const { lang } = useParams();
  // const { data } = useRoadmapsServiceGetRoadmaps({ locale: lang as string });
  const { t } = useTranslate();
  // if (!data?.docs?.length) {
  //   return null;
  // }

  return (
    <ContentStack sx={{ gap: 3, pb: { xs: 3, md: 0 } }}>
      <Typography variant="p1-semi-bold">{t("roadMap.title")}</Typography>
      <Scrollbar>
        <Stack direction={{ xs: "column", md: "row" }} gap={{ md: 2, xs: 1 }}>
          {roadmapData.map((i, index) => (
            <Box
              key={index}
              sx={{
                flex: "0 0 calc(33.33% - 12px)",
                display: "flex",
                pb: { xs: undefined, md: 3 },
              }}
            >
              <RoadMapItem title={i.title} date={i.date} modalContent={i.modal} status={i.status} />
            </Box>
          ))}
        </Stack>
      </Scrollbar>
    </ContentStack>
  );
};

export default RoadMap;
