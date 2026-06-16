import Icon from "@/components/icon";
import { useFavoriteToggle } from "@/hooks/useFavoriteToggle";
import CryptoIcon from "@app-components/CryptoIcon";
import { IconButton, Stack } from "@mui/material";

interface NameHandlerProps {
  is_favorite: boolean;
  name: string;
  slug: string;
  symbol: string;
  logo: string;
}

const NameHandler = ({
  is_favorite,
  name,
  logo,
  symbol,
  slug,
}: NameHandlerProps) => {
  const { isFavorite, toggleFavorite } = useFavoriteToggle(is_favorite, slug);
  return (
    <Stack
      direction="row"
      alignItems="center"
      gap={1}
      sx={{ "&:hover > button": { visibility: "visible" } }}
    >
      <IconButton
        sx={{
          visibility: { xs: "visible", md: isFavorite ? "visible" : "hidden" },
          cursor: "pointer",
          p: 0,
          "& > svg ": {
            position: "absolute",
            top: 4,
            left: 4,
          },
        }}
        disableFocusRipple
        disableRipple
        disableTouchRipple
        onClick={(event) => {
          event?.stopPropagation();
          slug ? toggleFavorite() : undefined;
        }}
      >
        {slug && (
          <Icon
            name={"Star2Icon"}
            fill={isFavorite ? "warning.main" : "grey.dark"}
            size={30}
          />
        )}
      </IconButton>

      <CryptoIcon name={name} symbol={slug ? symbol : ""} logoUrl={logo} />
    </Stack>
  );
};

export default NameHandler;
