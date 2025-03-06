import type { IconProps } from '../types';

export const WarningIcon: IconProps = ({ stroke }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 12.38V9.38"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.999 15.25C11.861 15.25 11.749 15.362 11.75 15.5C11.75 15.638 11.862 15.75 12 15.75C12.138 15.75 12.25 15.638 12.25 15.5C12.25 15.362 12.138 15.25 11.999 15.25"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M13.8264 5.04274L20.7199 16.9052C21.5209 18.284 20.5084 20 18.8937 20H5.10679C3.49121 20 2.47866 18.284 3.2806 16.9052L10.1741 5.04274C10.9814 3.65242 13.0191 3.65242 13.8264 5.04274Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
