import Image from "@/components/Image";
import { Icon } from "@/components/icons";
import { useFavoriteToggle } from "@/hooks/useFavoriteToggle";
import { Box, IconButton, Stack, Typography } from "@mui/material";

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
      <Box width={24} height={24} position="relative" sx={{ "&  *": { position: "absolute !important" } }}>
        {slug ? (
          <Image src={logo} sx={{ width: 24, height: 24 }} alt="logo" />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: 24,
              height: 24,
              background: "var(--Gradients-Gradient-Sky, radial-gradient(50% 50% at 50% 50%, #FFF 0%, #CDDFF2 100%))",
              borderRadius: "50%",
              path: { stroke: (theme) => theme.palette.dark[1] },
            }}
          >
            <Icon name="Question" />
          </Box>
        )}
      </Box>
      <Typography
        variant="p2-medium"
        display="flex"
        alignItems="center"
        gap={1}
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            textWrap: "nowrap",
            overflow: "hidden",
            ml: 1,
          },
        })}
      >
        {slug ? name : "••••••••"}
        <Typography variant="p2-medium" color="grey.light">
          {slug ? symbol?.toLocaleUpperCase() : "••••"}
        </Typography>
      </Typography>
    </Stack>
  );
};

export default NameHandler;
