import { Select, MenuItem, Stack, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import English from "@/assets/country-flags/English";
import { Icon } from "@/components/icons";
import Germany from "@/assets/country-flags/Germany";
import Spain from "@/assets/country-flags/Spain";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectLang } from "@/lib/features/dictionary/dicSlice";
import { useAppRouter } from "@/routes/hooks";
import { handleLanguageChange } from "@/utils/handleLanguageChange";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-responsive";

const CustomSelect = styled(Select)(({ theme }) => ({
  backgroundColor: theme.palette.dark[2],
  color: "#fff",
  "& .MuiSelect-icon": {
    color: "#fff",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "transparent",
  },
}));

const CustomMenuItem = styled(MenuItem)(({ theme }) => ({
  backgroundColor: theme.palette.dark[2],
  color: "#fff",
  "&:hover": {
    backgroundColor: "#333",
  },

  "& .MuiListItemText-primary": {
    color: "#fff",
  },
}));

const languages = [
  { code: "en", name: "English", flag: <English /> },
  { code: "de", name: "Germany", flag: <Germany /> },
  { code: "es", name: "Española", flag: <Spain /> },
];

function LanguageSelect() {
  const isMobile = useIsMobile();
  const lang = useAppSelector(selectLang);
  const [language, setLanguage] = useState(lang);
  const { replace } = useAppRouter();
  const pathName = usePathname();
  const handleChange = (event: any) => {
    handleLanguageChange(pathName, event.target.value, replace);
    setLanguage(event.target.value);
  };

  return (
    <CustomSelect
      value={language}
      onChange={handleChange}
      renderValue={(selected) => {
        const selectedLanguage = languages.find((lang) => lang.code === selected);
        return (
          <Stack direction={"row"} gap={1} alignItems={"center"}>
            {selectedLanguage!.flag}
            <Typography variant="p2-medium">{selectedLanguage!.name}</Typography>
          </Stack>
        );
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            boxShadow: "none",
            backgroundColor: "dark.2",
            color: "#fff",
          },
        },
      }}
      style={{ width: isMobile ? "100%" : "164px" }}
    >
      {languages.map((lang) => (
        <CustomMenuItem key={lang.code} value={lang.code}>
          <Stack direction={"row"} gap={1} alignItems={"center"} sx={{ width: "100%", p: 1 }}>
            {lang.flag}
            <Typography variant="p2-medium">{lang.name}</Typography>
            {lang.code === language && (
              <Box sx={{ ml: "auto", path: { stroke: (theme) => theme.palette.pink.dark } }}>
                <Icon name="Check" />
              </Box>
            )}
          </Stack>
        </CustomMenuItem>
      ))}
    </CustomSelect>
  );
}

export default LanguageSelect;
