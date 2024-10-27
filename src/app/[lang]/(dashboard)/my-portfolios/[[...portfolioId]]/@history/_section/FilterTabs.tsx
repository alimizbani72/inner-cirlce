import { Box } from "@mui/material";
import { Stack, Typography } from "@mui/material";
type Props = {
  values: string[];
  setValue: (title: string) => void;
  selectedValue: string;
};
const FilterTabs = ({ values, setValue, selectedValue }: Props) => {
  const handleTabChange = (value: string) => {
    setValue(value);
  };

  return (
    <>
      <Stack direction={"row"}>
        {values.map((value, index) => (
          <Stack
            key={index}
            direction={"row"}
            alignItems={"center"}
            onClick={() => handleTabChange(value)}
            sx={{ cursor: "pointer" }}
          >
            <Box
              sx={{
                textAlign: "center",
                bgcolor: value === selectedValue ? "dark.3" : "dark.2",
                borderRadius: 1,
                px: 1,
              }}
            >
              <Typography
                variant="p2-medium"
                sx={{
                  color: value === selectedValue ? "white" : "grey.light",
                }}
              >
                {value}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </>
  );
};

export default FilterTabs;
