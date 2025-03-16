'use client';
import { Stack } from '@mui/material';
import Notice from './Notice';
import Table from './Table';
import LearningBanner from './LearningBanner';
import { useParams } from 'next/navigation';
import type { PlansType } from '@/routes/type';

const PortfolioStrategiesInnerSection = () => {
  const { slug: plan } = useParams();

  //   const dispatch = useAppDispatch();
  // ;

  //   useEffect(() => {
  //     dispatch(
  //       setPageInfo({ title: `${toTitleCase(plan as string)} Strategy`, hasBackButton: true })
  //     );
  //     return () => {
  //       dispatch(setPageInfo({ title: '', hasBackButton: false }));
  //     };
  //   }, [dispatch])
  return (
    <Stack gap={3} py={{ md: 4, xs: 3 }}>
      <LearningBanner />
      <Notice />
      <Table plan={plan as PlansType} />
    </Stack>
  );
};

export default PortfolioStrategiesInnerSection;
