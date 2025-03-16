import type { IconProps } from '../types';

export const CopyIcon: IconProps = ({ stroke }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect
        x="8"
        y="8"
        width="12"
        height="12"
        rx="2"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.42857 16H5.71429C4.76751 16 4 15.2325 4 14.2857V5.71429C4 4.76751 4.76751 4 5.71429 4H14.2857C15.2325 4 16 4.76751 16 5.71429V7.42857"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
