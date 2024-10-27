import { Icon } from "@/components/icons";
import Image from "@/components/Image";
import RiveComp from "@/components/RiveComp";
import { useTranslate } from "@/locales";
import { Box, Stack, TextField, Typography, type TextFieldProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { enqueueSnackbar } from "notistack";
import { useState, type FC } from "react";

const TransparentTextField = styled((props: TextFieldProps) => <TextField {...props} variant="outlined" />)(
  (_theme) => ({
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent", // Border color
      },
      "&:hover fieldset": {
        borderColor: "transparent", // Border color on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "transparent", // Border color when focused
      },
      backgroundColor: "transparent", // Background color
    },
    "& .MuiInputLabel-root": {
      color: "rgba(255, 255, 255, 0.5)", // Label color
    },
    "& .MuiInputLabel-root.Mui-focused": {
      color: "rgba(255, 255, 255, 0.7)", // Label color when focused
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent", // notched outline
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent !important", // notched outline when focused
    },
    "& .MuiOutlinedInput-root.Mui-focusVisible .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent", // notched outline when focus-visible
    },
    "& .MuiInputBase-input::placeholder": {
      color: "#626583",
      fontSize: "20px",
      fontStyle: "normal",
      fontWeight: 400,
      lineHeight: "32px",
      letterSpacing: "1.6px",
      textTransform: "uppercase",
      opacity: 1,
    },
    "& .MuiInputBase-input": {
      padding: "0",
      height: "100%",
      boxSizing: "border-box",
      display: "flex",
      alignItems: "center",
    },
  })
);

type CustomInputProps = { isLoading?: boolean };

const CustomInput: FC<CustomInputProps> = () => {
  const { t } = useTranslate();
  const [inputValue, setInputValue] = useState("");
  const [loading, setIsLoading] = useState(false);
  const testApi = async () => {
    setIsLoading(true);
    const response = await fetch("/api/keyword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ keyword: inputValue }),
    });

    const data = await response.json();
    setIsLoading(false);
    enqueueSnackbar({ message: data.message, variant: "error" });
  };
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"center"}
      sx={{ position: "relative", width: "100%" }}
    >
      <Box
        sx={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255, 125, 188, 0.64) 0%, rgba(255, 64, 157, 0.64) 100%)",
          width: 150,
          height: 150,
          borderRadius: "150px",
          position: "absolute",

          filter: "blur(100px)",
        }}
      />
      <Box
        sx={{
          background: "radial-gradient(50% 50% at 50% 50%, rgba(119, 157, 255, 0.40) 0%, rgba(86, 92, 228, 0.40) 100%)",
          width: 150,
          height: 150,
          borderRadius: "150px",
          position: "absolute",
          right: 0,
          filter: "blur(100px)",
        }}
      />

      <Box
        sx={{
          background: "rgba(0, 177, 113, 0.24)",
          width: 150,
          height: 150,
          borderRadius: "150px",
          position: "absolute",
          left: 0,
          filter: "blur(100px)",
        }}
      />
      <Image
        src="/assets/svg/Lable.svg"
        sx={{ position: "absolute", zIndex: 3, width: "102px", height: "24px", top: "-24px" }}
      />
      <TransparentTextField
        onChange={(e) => setInputValue(e.target.value)}
        fullWidth
        size="small"
        placeholder="Enter Keyword Here"
        sx={{ mx: 0.5 }}
        InputProps={{
          inputProps: {
            style: {
              width: "552px",
              height: "80px",
              color: "#626583",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "32px",
              letterSpacing: "1.6px",
              textTransform: "uppercase",
              padding: "0 16px",
              backgroundColor: "transparent",
              textAlign: "center",
            },
          },
        }}
      />
      <Image src="/assets/svg/Input.svg" sx={{ position: "absolute", width: "100%", zIndex: -1 }} />
      <Stack
        direction={"row"}
        justifyContent={"center"}
        alignItems={"center"}
        gap={1}
        sx={{
          cursor: "pointer",
          position: "absolute",
          width: "152px",
          height: "56px",
          background: (theme) => theme.palette.gradient.blue,
          zIndex: 5,
          borderRadius: "0px 0px 12px 12px",
          bottom: "-57px",
        }}
        onClick={testApi}
      >
        <Box sx={{ display: loading ? "block" : "none", width: "100%", height: "100%" }}>
          <RiveComp src="/assets/rive/Search_icon.riv" />
        </Box>

        <Stack
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={1}
          sx={{ display: loading ? "none" : "flex" }}
        >
          <Icon name="binoculars" />
          <Typography variant="p1-semi-bold">{t("secrethunt.search")}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default CustomInput;
