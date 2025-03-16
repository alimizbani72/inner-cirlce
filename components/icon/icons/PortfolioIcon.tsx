import type { IconProps } from '../types';

export const PortfolioIcon: IconProps = ({ stroke }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 4V11.9668L6.5 17.5"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 9L12 12"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.6569 6.34315C20.781 9.46735 20.781 14.5327 17.6569 17.6569C14.5327 20.781 9.46733 20.781 6.34315 17.6569C3.21895 14.5327 3.21895 9.46733 6.34315 6.34315C9.46735 3.21895 14.5327 3.21895 17.6569 6.34315"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
