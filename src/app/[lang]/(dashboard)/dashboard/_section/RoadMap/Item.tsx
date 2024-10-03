import { Icon } from "@/components/icons";
import { fDate } from "@/utils/format-time";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import type { FC } from "react";
import RoadMapModal from "./RoadMapModal";
import useToggleState from "@/hooks/use-toggle-state";
import Status, { statusColors } from "./Status";
import { convertRichTextToHTML } from "@/utils/convertRichTextToHTML";

interface RoadMapItemProps {
  title: string;
  date: string;
  status: string;
  image: string;
  descriptionText: any;
}

const RoadMapItem: FC<RoadMapItemProps> = ({ title, date, status, image, descriptionText }) => {
  const [open, toggleModal] = useToggleState();

  const color = statusColors[status as keyof typeof statusColors];

  return (
    <>
      <Stack
        onClick={() => {
          if (descriptionText) {
            toggleModal();
          }
        }}
        gap={2}
        p={2}
        flex={1}
        sx={{
          cursor: "pointer",
          ":hover": {
            bgcolor: "dark.1",
            "& > div:first-of-type": {
              bgcolor: "dark.3",
            },
          },
        }}
        direction={"row"}
        borderRadius={1.5}
        bgcolor={open ? "dark.1" : "dark.3"}
        alignItems={{ md: "center", xs: undefined }}
      >
        <Box
          sx={{
            width: "2px",
            height: { md: "100%", xs: undefined },
            bgcolor: open ? "dark.3" : "dark.1",
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%", height: "30%", bgcolor: color }} />
        </Box>
        <Stack gap={1} mr={{ md: undefined, xs: "auto" }}>
          <Typography variant="p2-medium">{title}</Typography>
          <Stack direction={"row"} spacing={1} alignItems={"center"}>
            <Typography variant="caption-regular" color={"grey.light"}>
              {fDate(date, "dd MMM, yyyy")}
            </Typography>
            <Box
              sx={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                bgcolor: "#626583",
              }}
            />
            <Status status={status}>{status}</Status>
          </Stack>
        </Stack>
        <IconButton>
          <Icon name="Arrow-right" color={"grey.light"} />
        </IconButton>
      </Stack>
      {open && (
        <RoadMapModal
          title={title}
          date={date}
          status={status}
          image={image}
          descriptionText={convertRichTextToHTML(descriptionText)}
          open={open}
          close={() => {
            toggleModal();
          }}
        />
      )}
    </>
  );
};

export default RoadMapItem;
