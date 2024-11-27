import { AutoComplete } from "@/components/AutoComplete";
import CustomDialog from "@/components/CustomDialog";
import Image from "@/components/Image";
import { Icon } from "@/components/icons";
import { useTranslate } from "@/locales";
import { toTitleCase } from "@/utils/change-case";
import { packageOptions, signalsList } from "@dashboard/coin-reports/_sections/consts";
import type { FilterFormDataType, ItemType, PackageType, SignalType } from "@dashboard/coin-reports/_sections/types.d";
import { useCoinReportServiceCoinReportCategoriesQuery } from "@minecraft/queries";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Stack,
  type SxProps,
  Typography,
} from "@mui/material";
import { type ReactNode, useMemo, useState } from "react";

interface FilterModalProps {
  onClose: () => void;
  onSubmit: (data: Omit<FilterFormDataType, "sorts"> & { sorts: string }) => void;
  filters: Omit<FilterFormDataType, "sorts"> & { sorts: string };
}

const FilterValue = ({
  label,
  onRemove,
  children,
  sx,
}: { label: ReactNode; onRemove: () => void; children?: ReactNode; sx?: SxProps }) => (
  <Box
    display="flex"
    alignItems="center"
    gap={0.5}
    borderRadius={0.75}
    border="1.5px solid"
    borderColor="dark.3"
    p={0.5}
  >
    {children}
    <Typography sx={sx} variant="p2-medium">
      {toTitleCase(label as string)}
    </Typography>
    <Box sx={{ cursor: "pointer", path: { stroke: (theme) => theme.palette.grey.light } }} onClick={onRemove}>
      <Icon name="Close" size={16} />
    </Box>
  </Box>
);

export const FilterModal = ({ onClose, onSubmit, filters }: FilterModalProps) => {
  const { t } = useTranslate();

  const [packages, setPackages] = useState<PackageType[]>(filters?.packages || []);
  const [signals, setSignals] = useState<SignalType[]>(filters?.signals || []);
  const [categories, setCategories] = useState<ItemType[]>(filters?.categories || []);

  const { data: categoriesData } = useCoinReportServiceCoinReportCategoriesQuery();

  const categoryOptions = useMemo(
    () => categoriesData?.data?.map((item) => ({ label: toTitleCase(item.slug as string), value: item.slug })) || [],
    [categoriesData]
  );

  const handleSubmit = () => {
    onSubmit({
      ...filters,
      packages: packages?.length ? packages : undefined,
      signals: signals?.length ? signals : undefined,
      categories: categories?.length ? categories : undefined,
    });
  };

  const handleClearAll = () => {
    setCategories([]);
    setSignals([]);
    setPackages([]);
  };

  return (
    <CustomDialog onClose={onClose} open fullWidth maxWidth="sm">
      <DialogTitle display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4-semi-bold">{t("coinReportTable.filters")}</Typography>
        <IconButton onClick={onClose}>
          <Icon name="Close" />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} mt={3}>
          <AutoComplete
            multiple
            onChange={(val) => setPackages(val)}
            value={packages}
            options={packageOptions}
            renderOption={(props, option) => (
              <MenuItem {...props} key={option.value} value={option.value}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Image src={option.img} alt={option.label} style={{ width: "24px", height: "24px" }} />
                  <Typography variant="p2-medium">{option.label}</Typography>
                </Stack>
              </MenuItem>
            )}
            placeholder={t("coinReportTable.selectPackage")}
            title={t("coinReportTable.package")}
            renderValue={(packageVal) => (
              <FilterValue
                key={packageVal.value}
                label={packageVal.label}
                onRemove={() => setPackages((prev) => prev.filter((item) => item.value !== packageVal.value))}
              >
                <Image width={24} height={24} src={packageVal.img} />
              </FilterValue>
            )}
          />
          <AutoComplete
            placeholder={t("coinReportTable.selectSignal")}
            options={signalsList}
            onChange={(val) => setSignals(val)}
            value={signals}
            multiple
            title={t("coinReportTable.signal")}
            fullWidth
            renderValue={(signalVal) => (
              <FilterValue
                key={signalVal.value}
                label={signalVal.label}
                onRemove={() => setSignals((prev) => prev.filter((item) => item.value !== signalVal.value))}
                sx={{ color: signalVal.color }}
              />
            )}
          />
          <AutoComplete
            placeholder={t("coinReportTable.selectCategory")}
            options={categoryOptions}
            onChange={(val) => setCategories(val)}
            value={categories}
            multiple
            title={t("coinReportTable.category")}
            fullWidth
            renderValue={(categoryVal) => (
              <FilterValue
                key={categoryVal.value}
                label={categoryVal.label}
                onRemove={() => setCategories((prev) => prev.filter((item) => item.value !== categoryVal.value))}
              />
            )}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Button color="info" onClick={handleClearAll} size="large">
            {t("coinReportTable.clearAll")}
          </Button>
          <Button onClick={handleSubmit} size="large">
            {t("coinReportTable.submitFilter")}
          </Button>
        </Box>
      </DialogActions>
    </CustomDialog>
  );
};
