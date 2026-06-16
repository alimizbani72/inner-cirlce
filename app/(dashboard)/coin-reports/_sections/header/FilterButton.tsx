import Icon from "@/components/icon";
import { useResponsive } from "@/hooks/use-responsive";
import { useTranslate } from "@/locales";
import { Badge, type BadgeProps, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMemo, useState } from "react";
import { FilterModal } from "../filterModal";
import type { FilterFormDataType } from "../types";

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
      if (
        !["timeFrame", "sorts", "query"].includes(key) &&
        (filters[key as keyof FilterFormDataType] as any[])?.length
      ) {
        value = { ...value, [key]: filters[key as keyof FilterFormDataType] };
      }
    }
    return value;
  }, [filters]);

  const hasActiveFilters = !!Object.keys(filterValue).length;

  const handleFilterSubmit = (
    data: Omit<FilterFormDataType, "sorts"> & {
      sorts: string;
    },
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
        sx={{
          borderRadius: 3,
          border: "1px solid",
          borderColor: "dark.3",
          px: 3,
          py: 1,
          gap: 0.5,
          cursor: "pointer",
        }}
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
          <Icon name="FilterIcon" />
        </StyledBadge>
        {isLarge && (
          <Typography variant="p2-medium">
            {" "}
            {t("coinReportTable.filter")}
          </Typography>
        )}
      </Stack>
      {openFilterModal && (
        <FilterModal
          onClose={() => setOpenFilterModal(false)}
          onSubmit={handleFilterSubmit}
          filters={{
            ...filters,
            sorts: Object.keys(filters?.sorts || {})?.[0],
          }}
        />
      )}
    </>
  );
};

export default FilterButton;
