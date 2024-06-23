import type { AppThunk } from "@/lib/store";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Plan {
  id: string;
  title: string;
  plan_type: string;
  description: string;
  cost: string;
}

interface Feature {
  featureName: string;
  featureValue: string;
  numberValue?: number;
  numberSuffix?: string;
  textValue?: string;
}

interface APIPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  buttonText: string;
  featuresTable: Feature[];
  createdAt: string;
  updatedAt: string;
}

interface PlansState {
  plans: Plan[];
  rows: Record<string, any[]>;
  status: "idle" | "loading" | "failed";
}

const initialState: PlansState = {
  plans: [],
  rows: {},
  status: "idle",
};

export const plansSlice = createSlice({
  name: "plans",
  initialState,
  reducers: {
    setPlans: (state, action: PayloadAction<Plan[]>) => {
      state.plans = action.payload;
    },
    setRows: (state, action: PayloadAction<Record<string, any[]>>) => {
      state.rows = action.payload;
    },
  },
  selectors: {
    selectPlans: (state: PlansState) => state.plans,
    selectRows: (state: PlansState) => state.rows,
  },
});

export const { setPlans, setRows } = plansSlice.actions;

export const { selectPlans, selectRows } = plansSlice.selectors;

export const mapApiDataToPlans =
  (data: APIPlan[]): AppThunk =>
  (dispatch) => {
    try {
      const plans: Plan[] = data.map((apiPlan) => ({
        id: apiPlan.id,
        title: apiPlan.name,
        plan_type: apiPlan.name.toLowerCase(),
        description: apiPlan.description,
        cost: apiPlan.price.toString(),
      }));

      const rows = data.reduce(
        (acc, apiPlan) => {
          apiPlan.featuresTable.forEach((feature) => {
            if (!acc[feature.featureName]) {
              acc[feature.featureName] = [];
            }
            switch (feature.featureValue) {
              case "number":
                acc[feature.featureName].push(`${feature.numberValue}${feature.numberSuffix || ""}`);
                break;
              case "check":
                acc[feature.featureName].push(true);
                break;
              case "xmark":
                acc[feature.featureName].push(false);
                break;
              case "text":
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

      dispatch(setPlans(plans));
      dispatch(setRows(rows));
    } catch (error) {
      console.error("Failed to process plans data:", error);
    }
  };
