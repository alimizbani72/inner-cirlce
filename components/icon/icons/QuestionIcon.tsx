import type { IconProps } from '../types';

export const QuestionIcon: IconProps = ({ stroke }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M9.00085 8.86388C9.31928 7.43524 10.5693 6.44469 11.9769 6.50551C13.5523 6.41467 14.9028 7.66435 15.0009 9.30365C15.0009 11.4077 12.1113 12.1018 12.1113 13.5009"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2509 16.5009C12.2509 16.6389 12.1389 16.7509 12.0009 16.7509C11.8628 16.7509 11.7509 16.6389 11.7509 16.5009C11.7509 16.3628 11.8628 16.2509 12.0009 16.2509"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
