import CustomTable from '@/components/CustomTable';
import { Stack } from '@mui/material';
import { useMemo } from 'react';
import { fDate } from '@/utils/format-time';
import ViewContractButton from './ViewContractButton';
import { useTranslate } from '@/locales';
import { useGetMe } from '@/services/minecraft/auth/auth';
import type { AuthHttpBusinessInfoResponse } from '@/services/minecraft/minecraftAPI.schemas';

interface DataType {
  id: string;
  name: string;
  business_Info?: AuthHttpBusinessInfoResponse;
}

const AccountContract = () => {
  const { data } = useGetMe();
  const userInfo = data?.data;
  const { t } = useTranslate();
  const columns = useMemo(
    () => [
      {
        title: t('businessAccount.contractType'),
        modify: (row: DataType) => row.name,
      },
      {
        title: t('businessAccount.date'),
        modify: (row: DataType) => fDate(row?.business_Info?.created_at, 'DD.MM.YYYY - HH:mm'),
      },
      {
        title: '',
        modify: (row: DataType) => (
          <Stack direction="row" alignItems="center" justifyContent="flex-end">
            <ViewContractButton info={row?.business_Info} />
          </Stack>
        ),
      },
    ],
    [t]
  );

  return (
    <Stack px={{ md: 4, xs: 0 }} pb={3}>
      <Stack alignItems="flex-start" maxWidth="100%">
        <CustomTable
          title={t('businessAccount.contract')}
          minWidthCell={'200px !important'}
          data={[
            {
              id: 'Contract between “ChainMind & You”',
              name: 'Contract between “ChainMind & You”',
              business_Info: userInfo?.business_info,
            },
          ]}
          containerHeight={'max-content'}
          columns={columns}
        />
      </Stack>
    </Stack>
  );
};

export default AccountContract;
