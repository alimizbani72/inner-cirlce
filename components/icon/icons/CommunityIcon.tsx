import type { IconProps } from '../types';

export const CommunityIcon: IconProps = ({ stroke }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.9374 9.90853C14.9289 8.81004 14.0359 7.92401 12.9374 7.92401H4.93396C3.82473 7.92401 2.92738 8.82673 2.934 9.93594L3 21L6 18H12.9845C14.0951 18 14.993 17.0951 14.9844 15.9845L14.9374 9.90853Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 5C9 3.89543 9.89543 3 11 3H19C20.1046 3 21 3.89543 21 5V16L18 13H11C9.89543 13 9 12.1046 9 11V5Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
