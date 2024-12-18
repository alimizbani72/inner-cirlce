import { useMemo, type Dispatch, type SetStateAction } from "react";
import type { ItemType } from "../types";
import { useTranslate } from "@/locales";
import { AutoComplete } from "@/components/AutoComplete";
import { useCoinReportServiceCoinReportCategoriesQuery } from "@minecraft/queries";
import { toTitleCase } from "@/utils/change-case";
import { Box, Typography } from "@mui/material";
import { Icon } from "@/components/icons";

interface CategoryAutoCompleteProps {
  setCategories: Dispatch<SetStateAction<ItemType[]>>;
  categories: ItemType[];
}

const CategoryAutoComplete = ({ setCategories, categories }: CategoryAutoCompleteProps) => {
  const { t } = useTranslate();

  const { data: categoriesData } = useCoinReportServiceCoinReportCategoriesQuery();

  const categoryOptions = useMemo(
    () => categoriesData?.data?.map((item) => ({ label: item.name, value: item.slug })) || [],
    [categoriesData]
  );

  return (
    <AutoComplete
      placeholder={t("coinReportTable.selectCategory")}
      options={categoryOptions}
      onChange={(val) => setCategories(val)}
      value={categories}
      multiple
      title={t("coinReportTable.category")}
      fullWidth
      renderValue={(categoryVal) => (
        <Box
          key={categoryVal?.value}
          display="flex"
          alignItems="center"
          gap={0.5}
          borderRadius={0.75}
          border="1.5px solid"
          borderColor="dark.3"
          p={0.5}
        >
          <Typography variant="p2-medium">{toTitleCase(categoryVal?.label as string)}</Typography>
          <Box
            sx={{ cursor: "pointer", path: { stroke: (theme) => theme.palette.grey.light } }}
            onClick={() => setCategories((prev) => prev.filter((item) => item.value !== categoryVal.value))}
          >
            <Icon name="Close" size={16} />
          </Box>
        </Box>
      )}
    />
  );
};
export default CategoryAutoComplete;
