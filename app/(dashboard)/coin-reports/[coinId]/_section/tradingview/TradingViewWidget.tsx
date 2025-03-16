'use client';
import { Box, Stack } from '@mui/material';
import { memo, useEffect, useRef } from 'react';

function TradingViewWidget({ rawSymbol }: { rawSymbol: string }) {
  const container = useRef<HTMLDivElement | null>(null);
  const formattedSymbol = `${rawSymbol.toUpperCase()}USDT`;
  useEffect(() => {
    if (!container.current) {
      return;
    }
    container.current.innerHTML = '';

    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
    script.type = 'text/javascript';
    script.async = true;
    script.innerHTML = `
      {
        "autosize": true,
        "symbol":  "${formattedSymbol}",
        "interval": "D",
          "timezone": "Etc/UTC",
          "theme": "dark",
          "style": "1",
          "locale": "en",
           "backgroundColor": "#070720",
          "withdateranges": true,
          "hide_side_toolbar": false,
          "allow_symbol_change": true,
          "details": true,
          "calendar": false,
          "hide_volume": true,
        "support_host": "https://www.tradingview.com"
      }`;

    // Delay appending the script to ensure the DOM is fully rendered and stable, to avoid console error
    setTimeout(() => {
      if (container.current) {
        container.current.appendChild(script);
      }
    }, 100);
    // Cleanup function to remove appended script on unmount
    return () => {
      if (container.current) {
        container.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <Stack>
      <Box
        ref={container}
        sx={{
          aspectRatio: '16/4',
          width: '100%',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      ></Box>
    </Stack>
  );
}

export default memo(TradingViewWidget);
