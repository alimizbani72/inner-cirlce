import type { IconProps } from '../types';

export const ArrowsortIcon: IconProps = ({ stroke }) => {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Icons/Arrow up">
        <g id="Group">
          <path
            id="Path"
            d="M13 8L10 5L7 8"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="Path_2"
            d="M7 12L10 15L13 12"
            stroke={stroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </g>
    </svg>
  );
};
