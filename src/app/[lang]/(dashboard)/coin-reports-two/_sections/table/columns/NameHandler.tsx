import Image from "@/components/Image";
import { Icon } from "@/components/icons";
import { handleOptsForService } from "@dashboard/coin-reports-two/_sections";
import type { FilterFormDataType } from "@dashboard/coin-reports-two/_sections/types";
import {
  UseCoinReportServiceCoinReportQueryKeyFn,
  useCoinReportServiceCoinReportSlugFavoriteCreateMutation,
  useCoinReportServiceCoinReportSlugFavoriteDeleteMutation,
} from "@minecraft/queries";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";

interface NameHandlerProps {
  is_favorite: boolean;
  name: string;
  slug: string;
  symbol: string;
  logo: string;
  filters: FilterFormDataType;
}

const NameHandler = ({ is_favorite, name, logo, symbol, filters, slug }: NameHandlerProps) => {
  const queryClient = useQueryClient();
  const { mutateAsync: mutateAddFavorite } = useCoinReportServiceCoinReportSlugFavoriteCreateMutation();
  const { mutateAsync: mutateRemoveFavorite } = useCoinReportServiceCoinReportSlugFavoriteDeleteMutation();

  const toggleFavorite = () => {
    const mutation = is_favorite ? mutateRemoveFavorite : mutateAddFavorite;
    const updateData = { slug };

    mutation(updateData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: UseCoinReportServiceCoinReportQueryKeyFn({ opts: handleOptsForService(filters) }),
        });
      },
    });
  };

  return (
    <Stack direction="row" alignItems="center" gap={1} sx={{ "&:hover > button": { visibility: "visible" } }}>
      <IconButton
        sx={{
          visibility: { xs: "visible", md: is_favorite ? "visible" : "hidden" },
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
        {slug && <Icon name={is_favorite ? "Star-color--full" : "Star-grey"} />}
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
