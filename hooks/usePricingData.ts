import { useGetPackages } from '@/services/cms/packages/packages';
import { packageNameModifier } from '@/utils/string';
import { useMemo } from 'react';

export const usePricingData = () => {
  const { data, isLoading } = useGetPackages();

  const { plans, rows } = useMemo(() => {
    const plansData = data?.data?.docs?.map((apiPlan) => ({
      id: apiPlan.name,
      title: apiPlan.name,
      plan_type: packageNameModifier(apiPlan.name),
      description: apiPlan.description,
      cost: apiPlan.price.toString(),
      buttonText: apiPlan.buttonText,
    }));

    const rowsData = data?.data?.docs?.reduce(
      (acc, apiPlan) => {
        apiPlan.featuresTable.forEach((feature) => {
          if (!acc[feature.featureName]) {
            acc[feature.featureName] = [];
          }
          switch (feature.featureValue) {
            case 'number':
              acc[feature.featureName].push(`${feature.numberValue}${feature.numberSuffix || ''}`);
              break;
            case 'check':
              acc[feature.featureName].push(true);
              break;
            case 'xmark':
              acc[feature.featureName].push(false);
              break;
            case 'goldCoins':
              acc[feature.featureName].push(feature.goldCoinsValue);
              break;
            case 'text':
              acc[feature.featureName].push(feature.textValue);
              break;
            default:
              acc[feature.featureName].push(null);
              break;
          }
        });
        return acc;
      },
      {} as Record<string, any[]>
    );

    return { rows: rowsData, plans: plansData };
  }, [data]);

  return { plans, rows, isLoading };
};
