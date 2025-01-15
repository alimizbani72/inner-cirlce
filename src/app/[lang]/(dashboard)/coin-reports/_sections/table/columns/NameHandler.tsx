import { Icon } from "@/components/icons";
import { useFavoriteToggle } from "@/hooks/useFavoriteToggle";
import CryptoIcon from "@app/_components/CryptoIcon";
import { IconButton, Stack } from "@mui/material";

interface NameHandlerProps {
  is_favorite: boolean;
  name: string;
  slug: string;
  symbol: string;
  logo: string;
}

const NameHandler = ({ is_favorite, name, logo, symbol, slug }: NameHandlerProps) => {
  const { isFavorite, toggleFavorite } = useFavoriteToggle(is_favorite, slug);
  return (
    <Stack direction="row" alignItems="center" gap={1} sx={{ "&:hover > button": { visibility: "visible" } }}>
      <IconButton
        sx={{
          visibility: { xs: "visible", md: isFavorite ? "visible" : "hidden" },
          cursor: "pointer",
          p: 0,
        }}
        disableFocusRipple
        disableRipple
        disableTouchRipple
        onClick={(event) => {
          event?.stopPropagation();
          slug ? toggleFavorite() : undefined;
        }}
      >
        {slug && <Icon name={isFavorite ? "Star-color--full" : "Star-grey"} />}
      </IconButton>

      <CryptoIcon name={name} symbol={slug ? symbol : ""} logoUrl={logo} />
    </Stack>
  );
};

export default NameHandler;
