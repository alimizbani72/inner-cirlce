import CustomDialog from "@/components/CustomDialog";
import { Icon } from "@/components/icons";
import { fDate } from "@/utils/format-time";
import { Box, DialogContent, DialogTitle, Divider, IconButton, ListItemText, Stack, Typography } from "@mui/material";
import Status from "./Status";

type RoadMapModalProps = {
  open: boolean;
  close: VoidFunction;
  title: string;
  date: string;
  status: string;
  modalContent: {
    image: string;
    descriptionText: string;
    descriptionPoints: string[];
    additionalDescription: string;
  };
};

export default function RoadMapModal({ open, close, modalContent, title, status, date }: RoadMapModalProps) {
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
          <img src={modalContent.image} />
          <Typography variant="p2-regular">{modalContent.descriptionText}</Typography>
          <Stack>
            {modalContent.descriptionPoints.map((point, index) => (
              <Stack direction={"row"} alignItems={"center"} key={index}>
                <Box
                  sx={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    bgcolor: "grey.contrastText",
                    marginRight: 2,
                  }}
                />
                <ListItemText primary={<Typography variant="p2-regular">{point}</Typography>} />
              </Stack>
            ))}
          </Stack>
          <Typography variant="p2-regular">{modalContent.additionalDescription}</Typography>
        </Stack>
      </DialogContent>
    </CustomDialog>
  );
}
