import type { IconProps } from '../types';

export const TutorialIcon: IconProps = ({ stroke }) => {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M15 13.82C15.6407 13.501 16.2973 13.298 17 13.18"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 13.18C7.70267 13.297 8.35933 13.501 9 13.82"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 9.18C16.2973 9.297 15.6407 9.501 15 9.82"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 9.82C8.35933 9.501 7.70267 9.298 7 9.18"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6.86501C9.69422 5.59368 7.63378 5.08795 4.904 5.00132C4.408 4.9847 4 5.38719 4 5.8763V16.2473C4 16.7207 4.38489 17.1136 4.86578 17.1206C7.61422 17.1608 9.68356 17.6595 12 19C14.3164 17.6595 16.3858 17.1608 19.1342 17.1206C19.6151 17.1136 20 16.7207 20 16.2465V5.87542C20 5.38631 19.592 4.9847 19.096 5.00045C16.3662 5.08795 14.3058 5.59368 12 6.86501Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 7V19"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
