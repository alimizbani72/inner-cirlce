import type { Metadata } from "next";
import type { ReactNode } from "react";
import ComingSoon from "@app/_components/CommingSoon";
// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: { default: "Education", template: "%s | ChainMind" },
};

export type LayoutProps = {
  children: ReactNode;
};

// export default async function EducationLayout({ children, params }: LayoutProps & RouteParamsType) {
//   const queryClient = getQueryClient();
//   await Promise.all([prefetchUseContentServiceContentVideoAcademyLangQuery(queryClient, { lang: params.lang })]);

//   return (
//     <HydrationBoundary state={dehydrate(queryClient)}>
//       <SliceWrapper />
//       {children}
//     </HydrationBoundary>
//   );
// }

export default async function EducationLayout() {
  return <ComingSoon />;
}
