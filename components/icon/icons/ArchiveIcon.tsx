import type { IconProps } from '../types';

export const ArchiveIcon: IconProps = ({ stroke }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M12 11V4"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 11L15 8L12 11Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 15H7.89511C8.23151 15 8.53907 15.1068 8.68978 15.276L9.08711 15.7235C9.23771 15.893 9.54575 16.0001 9.88267 16H14.1164C14.4534 16.0001 14.7614 15.893 14.912 15.7235L15.3093 15.2765C15.4599 15.107 15.768 14.9999 16.1049 15H20"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6667 4H17.3333C18.8061 4 20 5.19391 20 6.66667V17.3333C20 18.8061 18.8061 20 17.3333 20H6.66667C5.19391 20 4 18.8061 4 17.3333V6.66667C4 5.19391 5.19391 4 6.66667 4H9.33333"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 8L12 11L9 8Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
