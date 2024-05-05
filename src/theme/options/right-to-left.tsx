// emotion
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import { type ReactNode, useEffect } from 'react';
// rtl
import rtlPlugin from 'stylis-plugin-rtl';

// ----------------------------------------------------------------------

type Props = {
  themeDirection: 'rtl' | 'ltr';
  children: ReactNode;
};

export default function RTL({ children, themeDirection }: Props) {
  useEffect(() => {
    document.dir = themeDirection;
  }, [themeDirection]);

  const cacheRtl = createCache({
    key: 'rtl',
    prepend: true,
    // @ts-ignore
    // https://github.com/styled-components/stylis-plugin-rtl/issues/35
    stylisPlugins: [rtlPlugin],
  });

  if (themeDirection === 'rtl') {
    return <CacheProvider value={cacheRtl}>{children}</CacheProvider>;
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>;
}

// ----------------------------------------------------------------------

export function direction(themeDirection: 'rtl' | 'ltr') {
  const theme = {
    direction: themeDirection,
  };

  return theme;
}
