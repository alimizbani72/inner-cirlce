import { Select, MenuItem, Stack, Typography, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Icon } from "@/components/icons";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectLang } from "@/lib/features/dictionary/dicSlice";
import { handleLanguageChange } from "@/utils/handleLanguageChange";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-responsive";
import { CircleFlagLanguage } from "react-circle-flags";

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
  { code: "en", name: "English" },
  { code: "de", name: "Germany" },
  { code: "es", name: "Española" },
  { code: "pt", name: "Portuguese" },
  { code: "sv", name: "Swedish" },
  { code: "ru", name: "Russian" },
  { code: "fr", name: "French" },
  { code: "he", name: "Hebrew" },
  { code: "hi", name: "Hindi" },
  { code: "ko", name: "Korean" },
  { code: "ja", name: "Japanese" },
  { code: "th", name: "Thai" },
  { code: "tr", name: "Turkish" },
  { code: "bn", name: "Bengali" },
  { code: "vi", name: "Vietnamese" },
  { code: "mn", name: "Mongolian" },
];

const LanguageSelect = () => {
  const isMobile = useIsMobile();
  const lang = useAppSelector(selectLang);
  const [language, setLanguage] = useState(lang);
  const pathName = usePathname();
  const handleChange = (event: any) => {
    handleLanguageChange(pathName, event.target.value);
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
            <CircleFlagLanguage languageCode={selectedLanguage!.code} height="24" title={selectedLanguage!.name} />

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
            <CircleFlagLanguage languageCode={lang.code} height="24" title={lang.name} />
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
};

export default LanguageSelect;
