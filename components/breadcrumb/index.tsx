'use client';

import { Stack, Typography } from '@mui/material';
import type { FC } from 'react';
import { usePathname } from 'next/navigation';
import Link from '../link';

const BreadCrumb: FC = () => {
  const pathname = usePathname();
  const pathSegments = decodeURIComponent(pathname).split('/').filter(Boolean);

  const breadcrumbs = pathSegments;

  // Create the breadcrumb paths for links
  const breadcrumbPaths = breadcrumbs.map((_, index) => {
    return `/${breadcrumbs.slice(0, index + 1).join('/')}`;
  });

  return (
    <Stack direction={'row'} gap={1} flexWrap={'wrap'}>
      {breadcrumbs.map((segment, index) => (
        <Stack key={index} direction={'row'} gap={1} flexWrap={'wrap'} alignItems={'center'}>
          {index < breadcrumbs.length - 1 ? (
            <Link href={breadcrumbPaths[index]}>
              <Typography variant="caption-medium" textTransform={'capitalize'} color="grey.light">
                {segment}
              </Typography>
            </Link>
          ) : (
            <Typography variant="caption-medium" textTransform={'capitalize'}>
              {segment}
            </Typography>
          )}
          {index < breadcrumbs.length - 1 && (
            <Typography variant="caption-medium" color="grey.light">
              {`>`}
            </Typography>
          )}
        </Stack>
      ))}
    </Stack>
  );
};

export default BreadCrumb;
