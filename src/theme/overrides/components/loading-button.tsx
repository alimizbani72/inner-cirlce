import type { Theme } from "@mui/material";
import { type ButtonPropsOverride, button } from "./button";

// ----------------------------------------------------------------------

const Indicator = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.9158 4V6.18947"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.9158 20V17.8105"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M20 11.9158H17.8105"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4 11.9158H6.18947"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.642 6.27368L16.1262 7.78947"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.27368 17.6419L7.78947 16.1261"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.642 17.6419L16.1262 16.1261"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6.27368 6.27368L7.78947 7.78947"
      stroke="white"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export function LoadingButton(theme: Theme) {
  return {
    MuiLoadingButton: {
      defaultProps: { variant: "contained", loadingIndicator: <Indicator /> },
      styleOverrides: {
        root: ({ ownerState }: { ownerState: ButtonPropsOverride }) => ({
          ".MuiLoadingButton-loadingIndicator": {
            ...button(theme).MuiButton.styleOverrides.root({ ownerState })[".MuiButton-icon"],
            svg: { animation: "spin 2s linear infinite" },
          },
          "&.Mui-disabled": {
            ...button(theme).MuiButton.styleOverrides.root({ ownerState })["&.Mui-disabled"],
            "&.MuiLoadingButton-loading": {
              color: "transparent",
              ".MuiButton-icon": { display: "none" },
            },
          },
        }),
      },
    },
  };
}
