import CustomDialog from "@/components/CustomDialog";
import { Icon } from "@/components/icons";
import { fDate } from "@/utils/format-time";
import { Box, DialogContent, DialogTitle, Divider, IconButton, Stack, Typography } from "@mui/material";
import Status from "./Status";
import ContentParser from "@app/_components/ContentParser";

type RoadMapModalProps = {
  open: boolean;
  close: VoidFunction;
  title: string;
  date: string;
  status: string;
  image: string;
  descriptionText: string;
};

export default function RoadMapModal({ open, close, image, descriptionText, title, status, date }: RoadMapModalProps) {
  return (
    <CustomDialog fullWidth maxWidth="xs" onClose={close} aria-labelledby="RoadMapModal-dialog" open={open}>
      <DialogTitle id="RoadMapModal-dialog">
        <Stack direction="row" justifyContent="space-between">
          <Stack gap={1} mr={{ md: undefined, xs: 4 }}>
            <Typography variant="h4-semi-bold">{title}</Typography>
            <Stack direction={"row"} spacing={2} alignItems={"center"}>
              <Typography variant="caption-regular" color={"grey.light"}>
                {fDate(date, "dd MMM, yyyy")}
              </Typography>
              <Box
                sx={{
                  width: "4px",
                  height: "4px",
                  borderRadius: "50%",
                  bgcolor: "grey.dark",
                }}
              />
              <Status status={status}>{status}</Status>
            </Stack>
          </Stack>
          <IconButton onClick={close} sx={{ mt: { xs: 0.5, md: 1 } }}>
            <Icon name="Close" />
          </IconButton>
        </Stack>
      </DialogTitle>
      <Divider />
      <DialogContent dividers>
        <Stack spacing={3} pt={3}>
          <img src={image} />
          <ContentParser content={descriptionText} />
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
}
