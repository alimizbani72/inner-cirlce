import { useMemo, useState } from "react";
import type { FilterFormDataType } from "../types";
import { type BadgeProps, Stack, styled, Typography } from "@mui/material";
import { Badge } from "@mui/material";
import { useResponsive } from "@/hooks/use-responsive";
import { Icon } from "@/components/icons";
import { useTranslate } from "@/locales";
import { FilterModal } from "../filterModal";

interface FilterButtonProps {
  onFilterChange: (filters: FilterFormDataType) => void;
  filters: FilterFormDataType;
}

const StyledBadge = styled(Badge)<BadgeProps>(() => ({
  "& .MuiBadge-badge": {
    right: 35,
    top: 12,
    border: `2px solid #565CE4`,
    padding: "0 4px",
  },
}));

const FilterButton = ({ onFilterChange, filters }: FilterButtonProps) => {
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const { t } = useTranslate();
  const isLarge = useResponsive("up", "lg");
  const filterValue = useMemo(() => {
    let value = {};
    for (const key in filters) {
      if (!["timeFrame", "sorts"].includes(key) && (filters[key as keyof FilterFormDataType] as any[])?.length) {
        value = { ...value, [key]: filters[key as keyof FilterFormDataType] };
      }
    }
    return value;
  }, [filters]);

  const hasActiveFilters = !!Object.keys(filterValue).length;

  const handleFilterSubmit = (
    data: Omit<FilterFormDataType, "sorts"> & {
      sorts: string;
    }
  ) => {
    setOpenFilterModal(false);
    onFilterChange({ ...data, sorts: { [data.sorts]: true } });
  };

  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        onClick={() => setOpenFilterModal(true)}
        sx={{ borderRadius: 3, border: "1px solid", borderColor: "dark.3", px: 3, py: 1, gap: 0.5, cursor: "pointer" }}
      >
        <StyledBadge
          badgeContent={Object.keys(filterValue).length}
          sx={{
            "& .MuiBadge-badge": {
              backgroundColor: "var(--Primary-Dark-Blue, #565CE4)",
              color: "white",
            },
          }}
          invisible={!hasActiveFilters}
        >
          <Icon name="Filter" />
        </StyledBadge>
        {isLarge && <Typography variant="p2-medium"> {t("coinReportTable.filter")}</Typography>}
      </Stack>
      {openFilterModal && (
        <FilterModal
          onClose={() => setOpenFilterModal(false)}
          onSubmit={handleFilterSubmit}
          filters={{ ...filters, sorts: Object.keys(filters?.sorts || {})?.[0] }}
        />
      )}
    </>
  );
};

export default FilterButton;
