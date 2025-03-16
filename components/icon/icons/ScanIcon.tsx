import type { IconProps } from '../types';

export const ScanIcon: IconProps = ({ fill }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M3 3V8.99939L5 8.99996V5H9V3H3Z" fill={fill} />
      <path d="M15 21H21V15.0006L19 15V19H15V21Z" fill={fill} />
      <path d="M21 9H19V5H15.0006L15 3H21V9Z" fill={fill} />
      <path d="M3 15V21H8.99939L8.99996 19H5V15H3Z" fill={fill} />
    </svg>
  );
};
