import type { IconProps } from '../types';

export const LogoutIcon: IconProps = ({ stroke }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M5.34375 18C6.98675 19.83 9.34575 21 11.9998 21C16.9708 21 20.9998 16.97 20.9998 12C20.9998 7.029 16.9708 3 11.9998 3C9.34575 3 6.98675 4.17 5.34375 6"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 12.0001H15"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 9L3 12L6 15"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
