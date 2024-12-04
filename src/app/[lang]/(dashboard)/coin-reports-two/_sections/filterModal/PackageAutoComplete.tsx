import { AutoComplete } from "@/components/AutoComplete";
import { Icon } from "@/components/icons";
import Image from "@/components/Image";
import { useTranslate } from "@/locales";
import { toTitleCase } from "@/utils/change-case";
import { packageOptions } from "@dashboard/coin-reports-two/_sections/consts";
import { Box, MenuItem, Stack, Typography } from "@mui/material";
import type { PackageType } from "../types";
import type { Dispatch, SetStateAction } from "react";

interface PackageAutoCompleteProps {
  setPackages: Dispatch<SetStateAction<PackageType[]>>;
  packages: PackageType[];
}

const PackageAutoComplete = ({ packages, setPackages }: PackageAutoCompleteProps) => {
  const { t } = useTranslate();

  return (
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
        <Box
          display="flex"
          alignItems="center"
          gap={0.5}
          borderRadius={0.75}
          border="1.5px solid"
          borderColor="dark.3"
          p={0.5}
        >
          <Image width={24} height={24} src={packageVal.img} />
          <Typography variant="p2-medium">{toTitleCase(packageVal?.label as string)}</Typography>
          <Box
            sx={{ cursor: "pointer", path: { stroke: (theme) => theme.palette.grey.light } }}
            onClick={() => setPackages((prev) => prev.filter((item) => item.value !== packageVal.value))}
          >
            <Icon name="Close" size={16} />
          </Box>
        </Box>
      )}
    />
  );
};

export default PackageAutoComplete;
