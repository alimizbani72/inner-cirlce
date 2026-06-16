// import { packageNameModifier } from "@/utils/string";
import { mockPackages } from "@/mock/mockdata";
import { useMemo } from "react";

export const usePricingData = () => {
  const data = mockPackages;
  const isLoading = false;

  const { plans, rows } = useMemo(() => {
    // 🧠 PLAN CARDS (COLUMNS)
    const plansData = data.map((plan) => ({
      id: plan.plan_type,
      title: plan.name,
      plan_type: plan.plan_type,
      description: plan.description,
      cost: plan.price.toString(),
      buttonText: plan.buttonText,
    }));

    // 🧠 FEATURE TABLE (ROWS)
    const rowsData = data.reduce(
      (acc, plan) => {
        plan.featuresTable.forEach((feature) => {
          if (!acc[feature.featureName]) {
            acc[feature.featureName] = [];
          }

          switch (feature.featureValue) {
            case "number":
              acc[feature.featureName].push(
                `${feature.numberValue ?? ""}${feature.numberSuffix ?? ""}`,
              );
              break;

            case "check":
              acc[feature.featureName].push(true);
              break;

            case "xmark":
              acc[feature.featureName].push(false);
              break;

            case "text":
              acc[feature.featureName].push(feature.textValue ?? "");
              break;

            default:
              acc[feature.featureName].push(null);
              break;
          }
        });

        return acc;
      },
      {} as Record<string, any[]>,
    );

    return {
      plans: plansData,
      rows: rowsData,
    };
  }, [data]);

  return {
    plans,
    rows,
    isLoading,
  };
};
