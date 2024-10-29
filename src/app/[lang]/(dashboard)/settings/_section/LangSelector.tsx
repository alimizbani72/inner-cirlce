import { Stack, Typography, Box } from "@mui/material";
import { Icon } from "@/components/icons";
import { useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import { selectLang } from "@/lib/features/dictionary/dicSlice";
import { handleLanguageChange } from "@/utils/handleLanguageChange";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/use-responsive";
import { CircleFlagLanguage } from "react-circle-flags";
import { CustomMenuItem, CustomSelect } from "@app/_components/CustomSelect";

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
  { code: "no", name: "Norwegian" },
  { code: "fi", name: "Finnish" },
];

const LanguageSelect = () => {
  const isMobile = useIsMobile();
  const pathName = usePathname();
  const lang = useAppSelector(selectLang);
  const [language, setLanguage] = useState(lang);
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

            {!isMobile && <Typography variant="p2-medium">{selectedLanguage!.name}</Typography>}
          </Stack>
        );
      }}
      sx={{ border: "1.5px solid", borderColor: "dark.3", width: isMobile ? "120px" : "164px" }}
      MenuProps={{
        PaperProps: {
          sx: {
            boxShadow: "none",
            backgroundColor: "dark.2",
            color: "#fff",
          },
        },
      }}
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
