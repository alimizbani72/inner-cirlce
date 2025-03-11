'use client';

import Icon from '@/components/icon';
import Link from '@/components/link';
import { CMSDownloadURL } from '@/consts';
import type { TranslationType } from '@/locales/use-locales';
import { CustomMenuItem, CustomSelect } from '@app-components/CustomSelect';
import { Stack, Typography } from '@mui/material';
import type { FC } from 'react';

type ResourceItem = {
  fileName: string;
  url: string;
  isFile: boolean;
};

interface ResourcesSelectorProps {
  resources?: ResourceItem[];
  isMobile: boolean;
  t: <K extends TranslationType>(input: K, values?: Record<string, any>) => string;
}

const ResourcesSelector: FC<ResourcesSelectorProps> = ({ resources, isMobile, t }) => {
  if (!resources?.length) {
    return null;
  }

  return (
    <CustomSelect
      MenuProps={{
        PaperProps: {
          sx: {
            boxShadow: 'none',
            backgroundColor: 'dark.2',
            color: '#fff',
          },
        },
      }}
      style={{ width: isMobile ? '100%' : '240px' }}
      value={1}
      id="resources-select"
    >
      <CustomMenuItem disabled value={1} sx={{ display: 'none' }}>
        <Typography variant="p2-medium">{t('educationSingleVideoSection.filesources')}</Typography>
      </CustomMenuItem>
      {resources.map((item, index) => (
        <CustomMenuItem key={index}>
          <Stack
            component={Link}
            href={item.isFile ? CMSDownloadURL(item.url) : item.url}
            target="_blank"
            download={item.isFile}
            rel="noreferrer"
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            sx={{ width: '100%', p: 1 }}
          >
            <Typography variant="p2-medium" color="grey.light">
              {item.fileName}
            </Typography>
            <Icon name={item.isFile ? 'DownloadIcon' : 'ArrowRightIcon'} />
          </Stack>
        </CustomMenuItem>
      ))}
    </CustomSelect>
  );
};

export default ResourcesSelector;
