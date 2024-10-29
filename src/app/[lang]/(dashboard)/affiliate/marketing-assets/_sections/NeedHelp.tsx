"use client";

import Link from "@/components/Link";
import { useTranslate } from "@/locales";
import { Box, Stack, Typography } from "@mui/material";
import type { FC } from "react";

const NeedHelp: FC = () => {
  const { t } = useTranslate();
  return (
    <Stack
      border="1.5px solid"
      borderColor="dark.3"
      borderRadius={1.5}
      sx={{ position: "relative", overflow: "hidden" }}
    >
      <Box
        sx={{
          background: "radial-gradient(50% 50% at 50% 50%, rgba(119, 157, 255, 0.64) 0%, rgba(86, 92, 228, 0.64) 100%)",
          width: { md: 400, xs: 288 },
          height: { md: 400, xs: 288 },
          borderRadius: { md: "400px", xs: "288px" },
          position: "absolute",
          left: { md: "-200px", xs: "-144px" },
          top: { md: "-100px", xs: "-144px" },
          filter: "blur(140px)",
        }}
      />

      <Box
        sx={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgba(255, 125, 188, 0.64) 0%, rgba(255, 64, 157, 0.64) 100%)",
          width: { md: 400, xs: 288 },
          height: { md: 400, xs: 288 },
          borderRadius: { md: "400px", xs: "288px" },
          position: "absolute",
          right: { md: "-200px", xs: "-144px" },
          top: { md: "-100px", xs: "unset" },
          bottom: { md: "unset", xs: "-144px" },
          filter: "blur(140px)",
        }}
      />

      <Stack sx={{ py: 3, px: { md: 3, xs: 2.5 }, position: "relative", zIndex: 1 }}>
        <Typography variant="h4-semi-bold">{t("marketingassetTab.needHelp")}</Typography>
        <Typography variant="p2-regular" color="#BBBDD0">
          {t("marketingassetTab.haveanyquestionsMessage")}:{" "}
          <Box
            display={{ md: "inline-block", xs: "flex" }}
            mt={{ md: "unset", xs: "10px" }}
            justifyContent="center"
            position="relative"
          >
            <Link href="mailto:support@chainmind.com">
              <Typography variant="p2-medium">support@chainmind.com</Typography>
            </Link>
            <Stack
              sx={{
                position: "absolute",
                top: { md: "10px", xs: "-15px" },
                right: { md: "-20px", xs: 10 },
                transform: { md: "unset", xs: "scale(-1, 1) rotate(150deg)" },
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="27" viewBox="0 0 14 27" fill="none">
                <g clipPath="url(#clip0_16112_70961)">
                  <path
                    d="M1.79447 27C2.31364 26.9436 2.83281 26.9718 3.32143 26.859C4.02384 26.6897 4.72624 26.4641 5.36757 26.1256C9.33767 24.0664 12.2694 21.0765 13.491 17.0428C14.7126 12.9246 13.7353 9.03199 10.5592 5.78816C8.9712 4.15214 7.04722 2.91102 4.90947 1.95198C4.51246 1.78273 4.14599 1.61349 3.50467 1.30321C4.39031 0.936516 5.06217 0.654444 5.76458 0.372372C5.73404 0.287751 5.73403 0.203127 5.70349 0.0903C5.48972 0.0620922 5.27595 -0.0225311 5.06217 0.00567666C3.9933 0.0902981 2.92442 0.203129 1.85555 0.315959C1.15314 0.40058 0.420201 0.456994 0.114808 1.16217C-0.221124 1.89556 0.236962 2.51612 0.75613 2.99565C1.48907 3.64441 2.31363 4.23676 3.1382 4.80091C3.32143 4.91373 3.65736 4.80091 3.93222 4.80091C3.93222 4.54704 4.02383 4.23676 3.90168 4.06752C3.50467 3.55979 3.01604 3.13668 2.52741 2.65716C2.61903 2.62895 2.68011 2.57254 2.71065 2.60074C9.42929 4.80091 13.4299 9.31406 12.7275 15.7453C12.697 16.0556 12.6359 16.3659 12.5138 16.6762C11.0173 20.9919 8.1161 24.1793 3.65736 26.1256C3.07712 26.3794 2.40525 26.4923 1.76393 26.6615C1.76393 26.7743 1.79447 26.8872 1.79447 27Z"
                    fill="url(#paint0_radial_16112_70961)"
                  />
                </g>
                <defs>
                  <radialGradient
                    id="paint0_radial_16112_70961"
                    cx="0"
                    cy="0"
                    r="1"
                    gradientUnits="userSpaceOnUse"
                    gradientTransform="translate(7 13.5) rotate(180) scale(7 13.5)"
                  >
                    <stop stopColor="#FFD18B" />
                    <stop offset="1" stopColor="#E68F0D" />
                  </radialGradient>
                  <clipPath id="clip0_16112_70961">
                    <rect
                      width="27"
                      height="14"
                      fill="white"
                      transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 14 27)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </Stack>
          </Box>
        </Typography>
      </Stack>
    </Stack>
  );
};

export default NeedHelp;
