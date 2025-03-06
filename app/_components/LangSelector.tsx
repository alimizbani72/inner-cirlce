import Icon from '@/components/icon';
import { useIsMobile } from '@/hooks/use-responsive';
import { selectLang } from '@/lib/features/dictionary/dicSlice';
import { useAppSelector } from '@/lib/hooks';
import { handleLanguageChange } from '@/utils/handleLanguageChange';
import { CustomMenuItem, CustomSelect } from '@app-components/CustomSelect';
import { Box, Stack, type SxProps, Typography } from '@mui/material';
import { useState } from 'react';
import { CircleFlagLanguage } from 'react-circle-flags';

interface LanguageSelectProps {
  sx?: SxProps;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'de', name: 'Germany' },
  { code: 'es', name: 'Española' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'sv', name: 'Swedish' },
  { code: 'ru', name: 'Russian' },
  { code: 'fr', name: 'French' },
  { code: 'he', name: 'Hebrew' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ko', name: 'Korean' },
  { code: 'ja', name: 'Japanese' },
  { code: 'th', name: 'Thai' },
  { code: 'tr', name: 'Turkish' },
  { code: 'bn', name: 'Bengali' },
  { code: 'vi', name: 'Vietnamese' },
  { code: 'mn', name: 'Mongolian' },
  { code: 'no', name: 'Norwegian' },
  { code: 'fi', name: 'Finnish' },
];

const LanguageSelect = (props: LanguageSelectProps) => {
  const { sx } = props;
  const isMobile = useIsMobile();
  const lang = useAppSelector(selectLang);
  const [language, setLanguage] = useState(lang);
  const handleChange = (event: any) => {
    handleLanguageChange(event.target.value);
    setLanguage(event.target.value);
  };

  return (
    <CustomSelect
      value={language}
      onChange={handleChange}
      renderValue={(selected) => {
        const selectedLanguage = languages.find((lang) => lang.code === selected);
        return (
          <Stack direction={'row'} gap={1} alignItems={'center'}>
            <CircleFlagLanguage
              languageCode={selectedLanguage!.code}
              height="24"
              title={selectedLanguage!.name}
            />

            <Typography variant="p2-medium">{selectedLanguage!.name}</Typography>
          </Stack>
        );
      }}
      MenuProps={{
        PaperProps: {
          sx: {
            boxShadow: 'none',
            backgroundColor: 'dark.2',
            color: '#fff',
          },
        },
      }}
      sx={{ width: isMobile ? '100%' : '164px', ...sx }}
    >
      {languages.map((lang) => (
        <CustomMenuItem key={lang.code} value={lang.code}>
          <Stack direction={'row'} gap={1} alignItems={'center'} sx={{ width: '100%', p: 1 }}>
            <CircleFlagLanguage languageCode={lang.code} height="24" title={lang.name} />
            <Typography variant="p2-medium">{lang.name}</Typography>
            {lang.code === language && (
              <Box sx={{ ml: 'auto', path: { stroke: (theme) => theme.palette.pink.dark } }}>
                <Icon name="CheckIcon" />
              </Box>
            )}
          </Stack>
        </CustomMenuItem>
      ))}
    </CustomSelect>
  );
};

export default LanguageSelect;
