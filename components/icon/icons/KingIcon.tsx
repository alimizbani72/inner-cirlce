import type { IconProps } from '../types';

export const KingIcon: IconProps = ({ stroke }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M18.4 5.60001C21.9 9.10001 21.9 14.8 18.4 18.3C14.9 21.8 9.20001 21.8 5.70001 18.3C2.20001 14.8 2.20001 9.10001 5.70001 5.60001C9.20001 2.10001 14.8 2.10001 18.4 5.60001"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.5 15H7.5C7.2 15 7 14.8 7 14.5V9.99999C7 9.59999 7.5 9.29999 7.8 9.59999L9.8 11.2L11.6 9.29999C11.8 9.09999 12.1 9.09999 12.3 9.29999L14.1 11.2L16.1 9.59999C16.4 9.29999 16.9 9.59999 16.9 9.99999V14.5C17 14.8 16.8 15 16.5 15V15Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
