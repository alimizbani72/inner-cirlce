import type { IconProps } from '../types';

export const CoinbaseIcon: IconProps = ({ fill }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_9542_29066)">
        <path
          d="M12 18C8.685 18 6 15.315 6 12C6 8.685 8.685 6 12 6C14.97 6 17.435 8.165 17.91 11H23.955C23.445 4.84 18.29 0 12 0C5.375 0 0 5.375 0 12C0 18.625 5.375 24 12 24C18.29 24 23.445 19.16 23.955 13H17.91C17.435 15.835 14.97 18 12 18Z"
          fill={fill}
        />
      </g>
      <defs>
        <clipPath id="clip0_9542_29066">
          <rect width="24" height="24" fill={fill} />
        </clipPath>
      </defs>
    </svg>
  );
};
