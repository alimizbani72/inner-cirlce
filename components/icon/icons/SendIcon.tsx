import type { IconProps } from '../types';

export const SendIcon: IconProps = ({ stroke }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.59533 18.8758L18.4271 12.8999C19.1906 12.5146 19.1906 11.4777 18.4271 11.0914L6.61256 5.12473C5.7209 4.67388 4.72155 5.52435 5.09953 6.41171L7.45684 11.9449L5.08015 17.5908C4.70755 18.4792 5.70582 19.3246 6.59533 18.8758Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.45581 11.949L19 12.0002"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
