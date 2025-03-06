import type { IconProps } from '../types';

export const MastercardIcon: IconProps = ({ fill }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="7.5" cy="12" r="6.75" fill={fill} />
      <circle cx="16.5" cy="12" r="6.75" fill={fill} />
      <path
        d="M12 17.0312C13.381 15.7952 14.25 13.9991 14.25 12C14.25 10.0009 13.381 8.20477 12 6.96881C10.619 8.20477 9.75 10.0009 9.75 12C9.75 13.9991 10.619 15.7952 12 17.0312Z"
        fill={fill}
      />
    </svg>
  );
};
