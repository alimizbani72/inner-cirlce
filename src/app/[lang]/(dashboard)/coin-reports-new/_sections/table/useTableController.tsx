import Image from "@/components/Image";
import { Icon } from "@/components/icons";
import { useTranslate } from "@/locales";
import {
  useCoinReportServiceCoinReportSlugFavoriteCreateMutation,
  useCoinReportServiceCoinReportSlugFavoriteDeleteMutation,
} from "@minecraft/queries";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import type { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useMemo } from "react";
import { packageOptions, riskLevelColor, signalsList } from "../consts";

export const useTableController = () => {
  const { t } = useTranslate();
  const { mutateAsync: mutateAddFavorite } = useCoinReportServiceCoinReportSlugFavoriteCreateMutation();
  const { mutateAsync: mutateRemoveFavorite } = useCoinReportServiceCoinReportSlugFavoriteDeleteMutation();

  const toggleFavorite = (slug: string, paramsRow: GridRenderCellParams) => {
    const isFavorite = paramsRow?.row?.is_favorite;
    const mutation = isFavorite ? mutateRemoveFavorite : mutateAddFavorite;
    const updateData = { slug };

    mutation(updateData).then((res) => {
      if (res.success) {
        paramsRow.api.updateRows([{ ...paramsRow?.row, is_favorite: !isFavorite }]);
      }
    });
  };

  const renderFavoriteIcon = (params: GridRenderCellParams) => (
    <IconButton
      sx={{
        visibility: { xs: "visible", md: params?.row?.is_favorite ? "visible" : "hidden" },
        cursor: "pointer",
        p: 0,
      }}
      disableFocusRipple
      disableRipple
      disableTouchRipple
      onClick={(event) => {
        event?.stopPropagation();
        params.value ? toggleFavorite(params.row.slug, params) : undefined;
      }}
    >
      {params.value && <Icon name={params?.row?.is_favorite ? "Star-color--full" : "Star-grey"} />}
    </IconButton>
  );

  const renderLogo = (params: GridRenderCellParams) => (
    <Box width={24} height={24} position="relative" sx={{ "&  *": { position: "absolute !important" } }}>
      {params.value ? (
        <Image src={params.row.logo} sx={{ width: 24, height: 24 }} alt="logo" />
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
  );

  const renderTextWithSymbol = (params: GridRenderCellParams) => (
    <Typography variant="p2-medium" display="flex" alignItems="center" gap={1}>
      {params.value || "••••••••"}
      <Typography variant="p2-medium" color="grey.light">
        {params.value ? params.row.symbol?.toLocaleUpperCase() : "••••"}
      </Typography>
    </Typography>
  );

  const renderChangePercentage = (params: GridRenderCellParams<{ cmr_change_percentage: number }>) => {
    const isPositive = params.row.cmr_change_percentage > 0;

    return (
      <Stack direction="row" alignItems="center" spacing={2}>
        <Typography variant="p2-medium">{params.value?.toString()?.slice(0, 5)}</Typography>
        {params.row.cmr_change_percentage !== null && (
          <Typography
            variant="caption-semi-bold"
            sx={(theme) => ({
              ...(isPositive
                ? {
                    color: "success.main",
                    "& path": { stroke: theme.palette.success.main },
                  }
                : {
                    color: params.row.cmr_change_percentage === 0 ? "common.white" : "danger.main",
                    "& path": { stroke: theme.palette.danger.main },
                  }),
            })}
          >
            {params.row.cmr_change_percentage !== 0 && <Icon name={isPositive ? "Arrow-up" : "Arrow-down"} />}
            {params.row.cmr_change_percentage}
          </Typography>
        )}
      </Stack>
    );
  };

  const renderText = (params: GridRenderCellParams) => (
    <Typography variant="p2-medium">
      {params.value ? `$${params.value?.toString()?.slice(0, 8)}` : "••••••••"}
    </Typography>
  );

  const renderSignalColor = (params: GridRenderCellParams) => {
    const currentSignal = signalsList.find((signal) => signal.value === params.value);
    return (
      <Typography variant="p2-medium" color={currentSignal?.color}>
        {currentSignal?.label}
      </Typography>
    );
  };

  const renderRiskLevel = (params: GridRenderCellParams) => (
    <Typography
      variant="p2-medium"
      color={riskLevelColor[params.value?.toString()?.replace(" Risk", "") as keyof typeof riskLevelColor]}
    >
      {params.value}
    </Typography>
  );

  const columns: GridColDef[] = useMemo(
    () => [
      {
        headerName: t("coinReportTabTable.name"),
        field: "name",
        filterable: false,
        minWidth: 300,
        renderCell: (params) => (
          <Stack direction="row" alignItems="center" gap={1} sx={{ "&:hover > button": { visibility: "visible" } }}>
            {renderFavoriteIcon(params)}
            {renderLogo(params)}
            {renderTextWithSymbol(params)}
          </Stack>
        ),
      },
      {
        headerName: t("coinReportTabTable.package"),
        field: "plan",
        sortable: false,
        renderCell: (params) => (
          <Typography variant="p2-medium" display="flex" alignItems="center">
            <Image
              src={packageOptions?.find((pack) => pack.value === params.value)?.img}
              sx={{ width: 24, height: 24 }}
              alt={params.value}
            />{" "}
            {!params?.row?.name && <Icon name="lock" />}
          </Typography>
        ),
      },
      {
        headerName: t("coinReportTabTable.category"),
        field: "category",
        minWidth: 200,
        flex: 1,
        renderCell: (params) => (
          <Typography variant="p2-medium">
            {params.value} {!params.row.name && "••••••••"}
          </Typography>
        ),
      },
      {
        headerName: t("coinReportTabTable.cmr"),
        field: "cmr",
        sortable: false,
        renderCell: renderChangePercentage,
      },
      {
        headerName: t("coinReportTabTable.eeSignal"),
        field: "signal",
        sortable: false,
        renderCell: renderSignalColor,
      },
      {
        headerName: t("coinReportTabTable.potentialMultiplicator"),
        field: "potential_multiplier",
        sortable: false,
        renderCell: (params: GridRenderCellParams) => (
          <Typography variant="p2-medium">
            {params.value ? `${params.value?.toString()?.slice(0, 5)}x` : "••••••••"}
          </Typography>
        ),
      },
      {
        headerName: t("coinReportTabTable.rtl"),
        field: "rtl",
        sortable: false,
        minWidth: 100,
        renderCell: (params: GridRenderCellParams) => (
          <Typography variant="p2-medium">
            {params.value ? `${params.value?.toString()?.slice(0, 5)}%` : "••••••••"}
          </Typography>
        ),
      },
      {
        headerName: t("coinReportTabTable.riskLevel"),
        field: "risk_level",
        sortable: false,
        renderCell: renderRiskLevel,
      },
      {
        headerName: t("coinReportTabTable.currentPrice"),
        field: "current_price",
        sortable: false,
        minWidth: 150,
        flex: 1,
        renderCell: renderText,
      },
    ],
    [t]
  );

  const buttons = useMemo(
    () => [
      {
        label: <Typography variant="p2-medium">{t("coinReportTable.allCoins")}</Typography>,
        value: "all-coins",
      },
      // {
      //   label: <Typography variant="p2-medium">{t("coinReportTable.preSale")}</Typography>,
      //   value: "pre-Sale",
      // },
      {
        label: <Typography variant="p2-medium">{t("coinReportTable.favorites")}</Typography>,
        value: "favorites",
      },
    ],
    [t]
  );

  return { columns, buttons };
};
