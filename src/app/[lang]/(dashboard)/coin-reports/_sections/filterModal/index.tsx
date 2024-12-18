import CustomDialog from "@/components/CustomDialog";
import { Icon } from "@/components/icons";
import { useTranslate } from "@/locales";
import type { FilterFormDataType, ItemType, PackageType, SignalType } from "@dashboard/coin-reports/_sections/types.d";
import { Box, Button, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import CategoryAutoComplete from "./CategoryAutoComplete";
import PackageAutoComplete from "./PackageAutoComplete";
import SignalAutoComplete from "./SignalAutoComplete";

interface FilterModalProps {
  onClose: () => void;
  onSubmit: (data: Omit<FilterFormDataType, "sorts"> & { sorts: string }) => void;
  filters: Omit<FilterFormDataType, "sorts"> & { sorts: string };
}

export const FilterModal = ({ onClose, onSubmit, filters }: FilterModalProps) => {
  const { t } = useTranslate();

  const [packages, setPackages] = useState<PackageType[]>(filters?.packages || []);
  const [signals, setSignals] = useState<SignalType[]>(filters?.signals || []);
  const [categories, setCategories] = useState<ItemType[]>(filters?.categories || []);

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
          <PackageAutoComplete {...{ packages, setPackages }} />
          <SignalAutoComplete {...{ signals, setSignals }} />
          <CategoryAutoComplete {...{ categories, setCategories }} />
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
