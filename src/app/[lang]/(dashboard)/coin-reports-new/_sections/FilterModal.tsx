import { AutoComplete } from "@/components/AutoComplete";
import CustomDialog from "@/components/CustomDialog";
import Image from "@/components/Image";
import { Icon } from "@/components/icons";
import { useTranslate } from "@/locales";
import { toTitleCase } from "@/utils/change-case";
import {
  SortOptions,
  packageOptions,
  signalColor,
  timeFrameOptions,
} from "@dashboard/coin-reports-new/_sections/consts";
import type {
  FilterFormDataType,
  ItemType,
  PackageType,
  SignalType,
} from "@dashboard/coin-reports-new/_sections/types.d";
import {
  useCoinReportServiceCoinReportCategoriesQuery,
  useCoinReportServiceCoinReportSignalsQuery,
} from "@minecraft/queries";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
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
  const [formData, setFormData] = useState<Pick<FilterModalProps["filters"], "sorts" | "timeFrame">>({
    sorts: filters?.sorts,
    timeFrame: filters?.timeFrame,
  });

  const { data: categoriesData } = useCoinReportServiceCoinReportCategoriesQuery();
  const { data: signalsData } = useCoinReportServiceCoinReportSignalsQuery();

  const categoryOptions = useMemo(
    () => categoriesData?.data?.map((item) => ({ label: toTitleCase(item.slug as string), value: item.slug })) || [],
    [categoriesData]
  );

  const signalOptions = useMemo(
    () =>
      signalsData?.data?.map((item) => ({
        label: toTitleCase(item.signal as string),
        value: item.signal,
        color: signalColor[item.signal as keyof typeof signalColor] ?? "white",
      })) || [],
    [signalsData]
  );

  const handleSaveData = (name: keyof FilterModalProps["filters"], value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit({
      packages: packages?.length ? packages : undefined,
      signals: signals?.length ? signals : undefined,
      categories: categories?.length ? categories : undefined,
      ...formData,
    });
  };

  const handleClearAll = () => {
    setCategories([]);
    setSignals([]);
    setPackages([]);
    setFormData({
      sorts: "newly_added",
      timeFrame: "1d",
    });
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
        <Box display="flex" justifyContent="space-between" gap={3} flexDirection={{ xs: "column", md: "row" }}>
          <Stack width={"100%"} spacing={1}>
            <Typography variant="caption-semi-bold" textTransform={"uppercase"}>
              {t("coinReportTable.sortBy")}
            </Typography>
            <Select
              MenuProps={{
                PaperProps: {
                  sx: {
                    boxShadow: "none",
                  },
                },
              }}
              value={formData?.sorts}
              onChange={(event) => handleSaveData("sorts", event.target.value)}
              fullWidth
              defaultValue={"newly_added"}
            >
              {SortOptions.map((sort) => (
                <MenuItem value={sort.value} key={sort.value}>
                  {sort.label}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          <Stack width={"100%"} spacing={1}>
            <Typography variant="caption-semi-bold" textTransform={"uppercase"}>
              {t("coinReportTable.timeFrame")}
            </Typography>
            <Select
              MenuProps={{
                PaperProps: {
                  sx: {
                    boxShadow: "none",
                  },
                },
              }}
              value={formData?.timeFrame}
              onChange={(event) => handleSaveData("timeFrame", event.target.value)}
              fullWidth
            >
              {timeFrameOptions?.map((time) => (
                <MenuItem value={time.value} key={time.value}>
                  {time.label}
                </MenuItem>
              ))}
            </Select>
          </Stack>
        </Box>
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
            options={signalOptions}
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
