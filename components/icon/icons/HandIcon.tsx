import type { IconProps } from '../types';

export const HandIcon: IconProps = ({ stroke }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14 12V3.5C14 2.672 13.328 2 12.5 2V2C11.672 2 11 2.672 11 3.5V12"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 5.5C14 4.672 14.672 4 15.5 4V4C16.328 4 17 4.672 17 5.5V12"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0005 5.5C11.0005 4.672 10.3285 4 9.50048 4V4C8.67248 4 8.00048 4.672 8.00048 5.5V11V14L6.09948 12.099C5.49248 11.492 4.50848 11.492 3.90148 12.099V12.099C3.37748 12.623 3.29648 13.444 3.70748 14.06L7.21948 19.328C8.33248 20.997 10.2055 22 12.2115 22H14.0005C17.3145 22 20.0005 19.314 20.0005 16V11V7.5C20.0005 6.672 19.3285 6 18.5005 6V6C17.6725 6 17.0005 6.672 17.0005 7.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
