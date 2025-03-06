import Loading from '@/components/Loading';
import type { AuthHttpBusinessInfoResponse } from '@/services/minecraft/minecraftAPI.schemas';
import BusinessInfo from './BusinessInfo';
import RequestCard from './RequestCard';
import { Stack } from '@mui/material';

type Props = {
  isLoading: boolean;
  businessInfo: AuthHttpBusinessInfoResponse | undefined;
};

const RenderContent = ({ businessInfo, isLoading }: Props) => {
  if (isLoading) {
    return <Loading />;
  }

  return !!businessInfo ? (
    <BusinessInfo />
  ) : (
    <Stack p={{ md: 4, xs: 3 }} alignItems="center">
      <RequestCard />
    </Stack>
  );
};

export default RenderContent;
