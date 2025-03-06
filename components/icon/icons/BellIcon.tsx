import type { IconProps } from '../types';

export const BellIcon: IconProps = ({ fill, stroke }) => {
  return (
    <svg width="29" height="31" viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.2026 23.9999C18.1935 23.9999 18.9977 23.2054 19.0009 22.2233V22.2233V22.2233C19.0002 21.7236 18.799 21.2446 18.4415 20.8922L17.2499 19.7103V16.1993C17.2497 14.8193 16.6959 13.4959 15.7107 12.5207C14.7255 11.5455 13.3895 10.9984 11.9971 10.9999V10.9999C9.10062 11.0014 6.75327 13.3287 6.75275 16.1993V19.7075L5.56116 20.8894C5.20343 21.2417 5.00184 21.7206 5.00085 22.2205V22.2205V22.2205C5.00398 23.2026 5.80818 23.9971 6.79912 23.9971L17.2026 23.9999Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0009 26.4999H13.0009"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="13" r="3.75" stroke={stroke} strokeWidth="1.5" />
      <g filter="url(#filter0_d_1936_11184)">
        <circle cx="16" cy="13" r="3" fill={fill} />
      </g>
      <defs>
        <filter
          id="filter0_d_1936_11184"
          x="3"
          y="0"
          width="26"
          height="26"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="2"
            operator="dilate"
            in="SourceAlpha"
            result="effect1_dropShadow_1936_11184"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="4" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1 0 0 0 0 0.466667 0 0 0 0 0.72549 0 0 0 0.24 0"
          />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1936_11184" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1936_11184"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
