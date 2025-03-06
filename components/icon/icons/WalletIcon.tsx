import type { IconProps } from '../types';

export const WalletIcon: IconProps = ({ stroke }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.002 6.99792V5.99751C17.002 4.89248 16.1062 3.99667 15.0012 3.99667H5.49726C4.11597 3.99667 2.99622 5.11643 2.99622 6.49772V18.5027C2.99622 19.884 4.11597 21.0038 5.49726 21.0038H18.5027C19.884 21.0038 21.0037 19.884 21.0037 18.5027V8.99876C21.0037 7.89373 20.1079 6.99792 19.0029 6.99792H2.99622"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.0021 14.0008H15.0012"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
