export const flexItem = ({
  count,
  gap,
}: { gap?: number; count: { lg?: number; md?: number; sm?: number; xs?: number } }) => ({
  flex: {
    ...(count.lg && { lg: `0 0 calc(calc(100% / ${count.lg}) - calc(${gap || 0}px / ${count.lg}))` }),
    ...(count.md && { md: `0 0 calc(calc(100% / ${count.md}) - calc(${gap || 0}px / ${count.md}))` }),
    ...(count.sm && { sm: `0 0 calc(calc(100% / ${count.sm}) - calc(${gap || 0}px / ${count.sm}))` }),
    ...(count.xs && { xs: `0 0 calc(calc(100% / ${count.xs}) - calc(${gap || 0}px / ${count.xs}))` }),
  },
  maxWidth: {
    ...(count.lg && { lg: `calc(calc(100% / ${count.lg}) - calc(${gap || 0}px / ${count.lg}))` }),
    ...(count.md && { md: `calc(calc(100% / ${count.md}) - calc(${gap || 0}px / ${count.md}))` }),
    ...(count.sm && { sm: `calc(calc(100% / ${count.sm}) - calc(${gap || 0}px / ${count.sm}))` }),
    ...(count.xs && { xs: `calc(calc(100% / ${count.xs}) - calc(${gap || 0}px / ${count.xs}))` }),
  },
});
