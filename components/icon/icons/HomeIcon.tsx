import type { IconProps } from '../types';

export const HomeIcon: IconProps = ({ stroke }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12.3325 15.9997L13.9995 12.9992H9.99954L11.6665 9.99966"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.9702 8.71004L13.6369 4.56166C12.6742 3.81233 11.3258 3.81233 10.3622 4.56166L5.02888 8.71004C4.3791 9.21581 3.99954 9.99269 3.99954 10.8149V17.333C3.99954 18.8059 5.19332 19.9997 6.66621 19.9997H17.3329C18.8058 19.9997 19.9995 18.8059 19.9995 17.333V10.8149C19.9995 9.99269 19.62 9.21581 18.9702 8.71004Z"
        stroke={stroke}
        strokeWidth="1.5"
      />
    </svg>
  );
};
