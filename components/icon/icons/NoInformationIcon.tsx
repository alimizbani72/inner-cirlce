import type { IconProps } from '../types';

export const NoInformationIcon: IconProps = ({ stroke }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M21 9V6C21 4.343 19.657 3 18 3H6C4.343 3 3 4.343 3 6V17C3 18.657 4.343 20 6 20H8"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.726 12.685L21.743 18.047C22.485 19.368 21.532 21 20.016 21H13.983C12.468 21 11.514 19.369 12.257 18.048L15.274 12.686C16.03 11.338 17.968 11.338 18.726 12.685Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 16.465V14.648"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.999 18.469C16.949 18.469 16.909 18.51 16.91 18.559C16.91 18.609 16.951 18.649 17 18.649C17.049 18.649 17.089 18.608 17.089 18.559C17.089 18.51 17.049 18.469 16.999 18.469"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 7.5H17"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 12H11"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
