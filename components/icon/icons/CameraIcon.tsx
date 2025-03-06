import type { IconProps } from '../types';

export const CameraIcon: IconProps = ({ stroke }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M14.8792 10.1678C16.4363 11.7248 16.4363 14.2492 14.8792 15.8063C13.3222 17.3633 10.7978 17.3633 9.24076 15.8063C7.68374 14.2492 7.68374 11.7248 9.24076 10.1678C10.7978 8.61078 13.3222 8.61078 14.8792 10.1678"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21 9V18C21 19.105 20.105 20 19 20H5C3.895 20 3 19.105 3 18V9C3 7.895 3.895 7 5 7H7L8.462 4.496C8.641 4.189 8.97 4 9.326 4H14.63C14.981 4 15.306 4.184 15.487 4.484L17 7H19C20.105 7 21 7.895 21 9Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
