import Icon from "@/components/icon";
import { useDebounce } from "@/hooks/use-debounce";
import { Box, TextField } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { useEffect, useState } from "react";

interface SearchInputProps {
  onChange: (value: string) => void;
}

const SearchInput = ({ onChange }: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  useEffect(() => {
    if (debouncedSearch !== undefined) {
      onChange(debouncedSearch);
    }
  }, [debouncedSearch]);
  return (
    <TextField
      placeholder="Search"
      size="small"
      slotProps={{
        input: {
          startAdornment: (
            <Box sx={{ path: { stroke: (theme) => theme.palette.grey.dark } }}>
              <Icon name="SearchIcon" stroke="grey.dark" />
            </Box>
          ),
        },
      }}
      fullWidth
      onChange={(event) => setSearchValue(event.target.value)}
      sx={{
        width: { xs: "100%", md: 140 },
        [`& .${outlinedInputClasses.root}`]: {
          borderRadius: "30px !important",
          bgcolor: "dark.3",
        },
      }}
    />
  );
};

export default SearchInput;
