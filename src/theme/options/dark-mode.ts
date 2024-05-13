import { palette } from "../palette";
import { shadows } from "../shadows";

// ----------------------------------------------------------------------

export function darkMode(mode: "light" | "dark") {
  const theme = {
    palette: palette(mode),
    shadows: shadows(mode),
  };

  return theme;
}
