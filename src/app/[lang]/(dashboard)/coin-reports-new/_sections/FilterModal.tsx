import CustomDialog from "@/components/CustomDialog";
import RiveComp from "@/components/RiveComp";
import FormProvider, { RHFAutocomplete, RHFSelect } from "@/components/hook-form";
import { Icon } from "@/components/icons";
import { plans } from "@/configs/plans";
import { useTranslate } from "@/locales";
import { Box, Button, DialogActions, DialogContent, DialogTitle, MenuItem, Stack, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

interface ItemType {
  label: string;
  value: string;
}
interface PackageType extends ItemType {
  img: string;
}
interface SignalType extends ItemType {
  color: string;
}

interface FilterModalProps {
  onClose: () => void;
}
const planKeys = Object.keys(plans) as Array<keyof typeof plans>;
const packages = planKeys.map((plan) => ({
  label: plan,
  value: plan,
  img: plans[plan].rive,
}));

export const FilterModal = (props: FilterModalProps) => {
  const { onClose } = props;
  const { t } = useTranslate();

  const methods = useForm<{ package: PackageType[]; signal: SignalType[]; category: ItemType[] }>({
    mode: "onSubmit",
    defaultValues: { package: [], signal: [], category: [] },
  });

  const { getValues, setValue } = methods;

  const renderValuePackage = (packageVal: PackageType) => {
    return (
      <Box
        display="flex"
        alignItems="center"
        gap={0.5}
        borderRadius={0.75}
        border="1px solid"
        borderColor="dark.3"
        px={0.5}
      >
        <RiveComp width={24} height={24} src={packageVal.img} />
        <Typography variant="p2-medium">{packageVal?.label}</Typography>
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() =>
            setValue(
              "package",
              getValues("package")?.filter((item) => item.value !== packageVal?.value)
            )
          }
        >
          <Icon name="Close" />
        </Box>
      </Box>
    );
  };

  const renderValueSignal = (signalVal: SignalType) => {
    return (
      <Box
        display="flex"
        alignItems="center"
        gap={0.5}
        borderRadius={0.75}
        border="1px solid"
        borderColor="dark.3"
        px={0.5}
      >
        <Typography variant="p2-medium" color={signalVal.color}>
          {signalVal?.label}
        </Typography>
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() =>
            setValue(
              "signal",
              getValues("signal")?.filter((item) => item.value !== signalVal?.value)
            )
          }
        >
          <Icon name="Close" />
        </Box>
      </Box>
    );
  };

  const renderValueCategory = (categoryVal: ItemType) => {
    return (
      <Box
        display="flex"
        alignItems="center"
        gap={0.5}
        borderRadius={0.75}
        border="1px solid"
        borderColor="dark.3"
        px={0.5}
      >
        <Typography variant="p2-medium">{categoryVal?.label}</Typography>
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() =>
            setValue(
              "category",
              getValues("category")?.filter((item) => item.value !== categoryVal?.value)
            )
          }
        >
          <Icon name="Close" />
        </Box>
      </Box>
    );
  };

  return (
    <CustomDialog onClose={onClose} open fullWidth maxWidth="sm">
      <DialogTitle>
        <Typography variant="h4-semi-bold">{t("coinReportTable.filters")}</Typography>
      </DialogTitle>
      <FormProvider methods={methods}>
        <DialogContent>
          <Box display="flex" justifyContent="space-between" gap={3} flexDirection={{ xs: "column", md: "row" }}>
            <RHFSelect name="sortBy" label={t("coinReportTable.sortBy")} placeholder="nnk" fullWidth>
              <MenuItem value={10}>Newly Added</MenuItem>
              <MenuItem value={20}>Descending</MenuItem>
              <MenuItem value={30}>Ascending</MenuItem>
            </RHFSelect>
            <RHFSelect name="timeFrame" label={t("coinReportTable.timeFrame")} placeholder="nnk" fullWidth>
              <MenuItem value={10}>1H</MenuItem>
              <MenuItem value={20}>24H</MenuItem>
              <MenuItem value={30}>7Days</MenuItem>
            </RHFSelect>
          </Box>
          <Stack spacing={3} mt={3}>
            <RHFAutocomplete
              placeholder={t("coinReportTable.selectPackage")}
              options={packages}
              multiple
              name="package"
              title={t("coinReportTable.package")}
              fullWidth
              sx={{ width: "100%" }}
              renderValue={renderValuePackage}
            />
            <RHFAutocomplete
              placeholder={t("coinReportTable.selectSignal")}
              options={[
                { label: "Very strong buy", value: "10", color: "#04AEAE" },
                { label: "Strong buy", value: "130", color: "#03B375" },
                { label: "Buy", value: "240", color: "#79B303" },
                { label: "Neutral", value: "350", color: "#DFAB00" },
                { label: "Sell", value: "460", color: "#E98A17" },
                { label: "Strong sell", value: "370", color: "#F96110" },
                { label: "Very strong sell", value: "380", color: "#FF3D3D" },
              ]}
              name="signal"
              title={t("coinReportTable.signal")}
              fullWidth
              sx={{ width: "100%" }}
              renderValue={renderValueSignal}
            />
            <RHFAutocomplete
              placeholder={t("coinReportTable.selectCategory")}
              options={[
                { label: "Layer 1", value: "10" },
                { label: "NFTs", value: "20" },
                { label: "Gaming", value: "30" },
                { label: "Memecoins", value: "40" },
                { label: "DeFi", value: "50" },
              ]}
              name="category"
              title={t("coinReportTable.category")}
              fullWidth
              sx={{ width: "100%" }}
              renderValue={renderValueCategory}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Box display="flex" justifyContent="space-between" width="100%">
            <Button variant="outlined" onClick={onClose}>
              {t("coinReportTable.clearAll")}
            </Button>
            <Button onClick={onClose}>{t("coinReportTable.submitFilter")}</Button>
          </Box>
        </DialogActions>
      </FormProvider>
    </CustomDialog>
  );
};
