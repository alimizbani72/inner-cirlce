'use client';
import Empty from '@/components/Empty';
import { useGetPortfolios } from '@/services/minecraft/portfolio/portfolio';
import { Stack, styled } from '@mui/material';
import usePortfolioData from '../../_section/hook/usePortfolioData';
import RenderContent from './RenderContent';

const ContainerStack = styled(Stack)(({ theme }) => ({
  width: '100%',
  height: '323.86px',
  padding: theme.spacing(3),
  backgroundColor: 'var(--palette-dark-2)',
  border: '1px solid',
  borderColor: 'var(--palette-dark-3)',
  borderRadius: '12px',
  overflow: 'hidden',
}));

const Allocation = () => {
  const { data: portfolios } = useGetPortfolios();
  const { selectedPortfolio, isLoading } = usePortfolioData();

  if (!portfolios?.data?.length) {
    return null;
  }

  // if (isLoading) {
  //   return <ContainerStack className={isLoading ? 'loading-skeleton' : ''}></ContainerStack>;
  // }

  return (
    <ContainerStack
      maxWidth={{
        xs: 'calc(100vw - 48px)',
      }}
      className={isLoading ? 'loading-skeleton' : ''}
    >
      {!selectedPortfolio?.data?.assets?.length && !isLoading ? (
        <Empty sx={{ mt: 2 }} />
      ) : (
        <RenderContent assets={selectedPortfolio?.data?.assets || []} />
      )}
    </ContainerStack>
  );
};

export default Allocation;
