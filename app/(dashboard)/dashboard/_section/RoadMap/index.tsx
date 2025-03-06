'use client';

import { Scrollbar } from '@/components/scrollbar';
import { CMSDownloadURL } from '@/consts';
import { selectLang } from '@/lib/features/dictionary/dicSlice';
import { useAppSelector } from '@/lib/hooks';
import { useTranslate } from '@/locales';
import { useGetRoadmaps } from '@/services/cms/roadmaps/roadmaps';
import ContentStack from '@app-components/ContentStack';
import { Box, Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import RoadMapItem from './Item';

interface RoadMapProps {}

const RoadMap: FC<RoadMapProps> = () => {
  const lang = useAppSelector(selectLang);
  const { data, isFetching } = useGetRoadmaps({
    locale: lang as string,
  });
  const { t } = useTranslate();

  return (
    <ContentStack sx={{ gap: 3, pb: { xs: 3, md: 0 } }}>
      <Typography variant="p1-semi-bold">{t('roadMap.title')}</Typography>
      <Scrollbar>
        <Stack direction={{ xs: 'column', md: 'row' }} gap={{ md: 2, xs: 1 }}>
          {isFetching
            ? Array.from({ length: 3 })?.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flex: '0 0 calc(33.33% - 12px)',
                    pb: { xs: undefined, md: 3 },
                  }}
                >
                  <Box className="loading-skeleton" height={83} width="100%" />
                </Box>
              ))
            : data?.data.docs.map((i, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    flex: '0 0 calc(33.33% - 12px)',
                    pb: { xs: undefined, md: 3 },
                  }}
                >
                  <RoadMapItem
                    title={i.title}
                    date={i.dateOnly}
                    image={CMSDownloadURL((i?.image as any)?.sizes?.roadmap?.url!)}
                    descriptionText={i?.descriptionText}
                    status={i.status}
                  />
                </Box>
              ))}
        </Stack>
      </Scrollbar>
    </ContentStack>
  );
};

export default RoadMap;
