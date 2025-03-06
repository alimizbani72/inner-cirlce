import type { IconProps } from '../types';

export const TrashIcon: IconProps = ({ stroke }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.5429 21.0037H8.4571C7.2809 21.0037 6.30301 20.0982 6.21279 18.9254L5.24719 6.37265H18.7528L17.7872 18.9254C17.697 20.0982 16.7191 21.0037 15.5429 21.0037V21.0037Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.0034 6.37264H3.9967"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.18626 2.99625H14.8136C15.4352 2.99625 15.9391 3.50014 15.9391 4.12172V6.37265H8.06079V4.12172C8.06079 3.82322 8.17937 3.53695 8.39043 3.32589C8.6015 3.11482 8.88777 2.99625 9.18626 2.99625Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99915 17.0021H14.0008"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
