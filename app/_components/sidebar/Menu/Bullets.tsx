import type { FC } from 'react';

export const BulletIcon: FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="2.75" stroke="#14162E" strokeWidth="1.5" />
    <circle cx="12" cy="12" r="2" fill="#14162E" />
  </svg>
);

export const BulletIconActive: FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clipPath="url(#clip0_1935_8065)">
      <circle cx="12" cy="12" r="2.75" stroke="#070720" strokeWidth="1.5" />
      <g filter="url(#filter0_d_1935_8065)">
        <circle cx="12" cy="12" r="2" fill="url(#paint0_radial_1935_8065)" />
      </g>
    </g>
    <defs>
      <filter
        id="filter0_d_1935_8065"
        x="0"
        y="0"
        width="24"
        height="24"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
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
          result="effect1_dropShadow_1935_8065"
        />
        <feOffset />
        <feGaussianBlur stdDeviation="4" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 1 0 0 0 0 0.490196 0 0 0 0 0.737255 0 0 0 0.24 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1935_8065" />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="effect1_dropShadow_1935_8065"
          result="shape"
        />
      </filter>
      <radialGradient
        id="paint0_radial_1935_8065"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(12 12) rotate(90) scale(2)"
      >
        <stop stopColor="#FF7DBC" />
        <stop offset="1" stopColor="#FF409D" />
      </radialGradient>
      <clipPath id="clip0_1935_8065">
        <rect width="24" height="24" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
