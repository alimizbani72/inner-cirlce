export const flexItem = ({
  count,
  gap,
}: { gap?: number; count: { lg?: number; md?: number; sm?: number; xs?: number } }) => ({
  flex: {
    ...(count.lg && { lg: `0 0 calc(calc(100% / ${count.lg}) - ${gap || 0}px)` }),
    ...(count.md && { md: `0 0 calc(calc(100% / ${count.md}) - ${gap || 0}px)` }),
    ...(count.sm && { sm: `0 0 calc(calc(100% / ${count.sm}) - ${gap || 0}px)` }),
    ...(count.xs && { xs: `0 0 calc(calc(100% / ${count.xs}) - ${gap || 0}px)` }),
  },
  maxWidth: {
    ...(count.lg && { lg: `calc(calc(100% / ${count.lg}) - ${gap || 0}px)` }),
    ...(count.md && { md: `calc(calc(100% / ${count.md}) - ${gap || 0}px)` }),
    ...(count.sm && { sm: `calc(calc(100% / ${count.sm}) - ${gap || 0}px)` }),
    ...(count.xs && { xs: `calc(calc(100% / ${count.xs}) - ${gap || 0}px)` }),
  },
});
