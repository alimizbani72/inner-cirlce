import Stack, { type StackProps } from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepConnector, { stepConnectorClasses } from "@mui/material/StepConnector";
import type { StepIconProps } from "@mui/material/StepIcon";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import type { FC } from "react";
import { Icon } from "./icons";
import { Typography } from "@mui/material";
import { useIsMobile } from "@/hooks/use-responsive";

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% )",
    right: "calc(50% )",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.dark[3],
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.dark[3],
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.dark[3],
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const CustomStepIconRoot = styled("div")<{ ownerState: { active?: boolean } }>(({ theme, ownerState }) => ({
  color: theme.palette.grey[200],
  display: "flex",
  height: 24,
  alignItems: "center",
  ...(ownerState.active && {
    color: theme.palette.primary.main,
  }),
  "& .CustomStepIcon-completedIcon": {
    color: theme.palette.primary.main,
    zIndex: 1,
    fontSize: 18,
  },
  "& .CustomStepIcon-circle": {
    width: 24,
    height: 24,
    borderRadius: "50%",
    padding: "6px",
    backgroundColor: theme.palette.dark[3],
  },
}));

function CustomStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <CustomStepIconRoot ownerState={{ active }} className={className}>
      {completed && <Icon className="CustomStepIcon-circle" name="fillStep" />}
      {active && <Icon className="CustomStepIcon-circle" name="currentStep" />}
      {!completed && !active && <Icon className="CustomStepIcon-circle" name="remainStep" />}
    </CustomStepIconRoot>
  );
}

const steps = ["Personal Information", "KYC Information", "Two-Factor Authentication"];

type CustomizedSteppersProps = StackProps & {
  activeStep: number;
};

const CustomizedSteppers: FC<CustomizedSteppersProps> = ({ activeStep }) => {
  const isMobile = useIsMobile();
  const direction = isMobile ? "column" : "row";
  return (
    <Stack direction={direction} justifyContent={"space-between"} gap={2}>
      <Typography variant="p2-medium">
        <Typography component={"span"} variant="p2-medium" color={"grey.light"}>
          {`0${activeStep + 1} -`}
        </Typography>{" "}
        {steps[activeStep]}
      </Typography>
      <Stack sx={{ flex: 1, maxWidth: isMobile ? "100%" : "153px" }}>
        <Stepper
          activeStep={activeStep}
          connector={<CustomConnector />}
          sx={{ ".MuiStep-root ": { padding: 0 }, ".MuiStepLabel-iconContainer": { padding: 0 } }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel StepIconComponent={CustomStepIcon} />
            </Step>
          ))}
        </Stepper>
      </Stack>
    </Stack>
  );
};

export default CustomizedSteppers;
