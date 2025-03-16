import type { IconProps } from '../types';

export const PlayIcon: IconProps = ({ fill, stroke }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.89289 7.17143L16.3842 10.9404C16.7659 11.1619 17 11.5648 17 12C17 12.4352 16.7659 12.8381 16.3842 13.0596L9.89289 16.8286C9.50505 17.0537 9.02401 17.0573 8.63269 16.8381C8.24136 16.6189 7.99986 16.2105 8 15.7681V8.23186C7.99986 7.78955 8.24136 7.38113 8.63269 7.16191C9.02401 6.94268 9.50505 6.94631 9.89289 7.17143Z"
        fill={fill}
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
