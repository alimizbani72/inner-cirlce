import type { FC } from 'react';
import SectionTitle from '../SectionTitle';

import { fCurrency } from '@/utils/format-number';
import { isOdd } from '@/utils/toNumber';
import { Box, Button, Stack, Typography } from '@mui/material';

import RiveComp from '@/components/rive-loader';
import { Scrollbar } from '@/components/scrollbar';
import { plans } from '@/configs/plans';
import type { Plan } from '@/lib/features/plans/plansSlice';
import { useTranslate } from '@/locales';
import { useRouter } from 'next/navigation';
import BlurTexture from './BlurTexture';

interface PricingPlansProps {
  plans?: Plan[];
  isLoading?: boolean;
}

const PricingPlans: FC<PricingPlansProps> = ({ plans: plansProp, isLoading }) => {
  const { push } = useRouter();
  const { t } = useTranslate();

  return (
    <Stack width="100%" px={3} maxWidth={1240} gap={{ md: 6, xs: 4 }} alignItems={'center'}>
      <SectionTitle
        title="Pricing"
        bigTypoColor="rgba(255, 255, 255, 0.02)"
        color="white"
        firsLetterColor="pink.dark"
      />
      <Scrollbar sx={{ maxWidth: '100vw', width: '100%' }}>
        <Stack maxWidth="100vw">
          <Stack px={3} width={'fit-content'} py={2} justifyContent="center">
            <Stack
              direction={'row'}
              border="1.5px solid"
              borderColor="dark.3"
              borderRadius={2}
              sx={{
                '> div:first-child': {
                  borderTopLeftRadius: 16,
                  borderBottomLeftRadius: 16,
                },
                '> div:last-child': {
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    top: -16,
                    bottom: -16,
                    left: 0,
                    right: 0,
                    borderRadius: 2,
                    border: '2px solid',
                    borderColor: 'pink.dark',
                  },
                },
              }}
            >
              {isLoading
                ? Array.from({ length: 8 }).map((_, index) => (
                    <Box key={index} className="loading-skeleton" width={222} height={541} />
                  ))
                : plansProp?.map((plan, index) => (
                    <Stack
                      key={plan.title}
                      bgcolor={isOdd(index) ? 'dark.2' : 'dark.3'}
                      position={'relative'}
                    >
                      {index + 1 === plansProp.length && (
                        <Box
                          width="100%"
                          position={'absolute'}
                          sx={{
                            top: -32,
                            bottom: -32,
                            left: 0,
                            right: 0,
                            zIndex: 1,
                            borderRadius: 2,
                          }}
                          overflow={'hidden'}
                        >
                          <BlurTexture />
                        </Box>
                      )}

                      <Stack
                        p={1}
                        width={222}
                        height={222}
                        alignItems="center"
                        justifyContent="center"
                        position={'relative'}
                        zIndex={5}
                      >
                        <RiveComp
                          width={175}
                          height={175}
                          src={plans[plan.plan_type as keyof typeof plans]?.rive}
                        />
                      </Stack>
                      <Stack gap={3} p={3} position={'relative'} zIndex={5} flex={1}>
                        <Stack gap={2}>
                          <Stack direction="row" justifyContent="space-between">
                            <Typography
                              variant="p1-semi-bold"
                              color="pink.light"
                              textTransform={'capitalize'}
                            >
                              {plan.title}
                            </Typography>

                            {index + 1 === plansProp.length && (
                              <Stack
                                sx={{
                                  width: 90,
                                  height: 24,
                                  borderRadius: 1.5,
                                  background: (theme) => theme.palette.gradient.orange,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}
                              >
                                <Typography
                                  textTransform="uppercase"
                                  color="dark.1"
                                  variant="caption-semi-bold"
                                >
                                  {t('landingpricing.popular')}
                                </Typography>
                              </Stack>
                            )}
                          </Stack>
                          <Typography variant="p2-medium" color="white" maxWidth={184}>
                            {plan.description}
                          </Typography>
                        </Stack>
                        <Typography mt="auto" variant="h3-semi-bold">
                          {plan.cost ? fCurrency(plan.cost) : 'FREE'}
                        </Typography>
                        <Button onClick={() => push('/pricing')}>
                          {t('landingpricing.getStarted')}
                        </Button>
                      </Stack>
                    </Stack>
                  ))}
            </Stack>
          </Stack>
        </Stack>
      </Scrollbar>
    </Stack>
  );
};

export default PricingPlans;
