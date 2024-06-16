import type { Metadata } from "next";
import AffiliateSection from "./_sections";

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: "Affiliate",
};

export default async function Affiliate() {
  // const queryClient = getQueryClient();
  // await Promise.all([
  //   prefetchUseAffiliateServiceAffiliateReferralCodeQuery(queryClient),
  //   // Add more prefetch queries here
  // ]);

  return (
    // <HydrationBoundary state={dehydrate(queryClient)}>
    <AffiliateSection />
    // </HydrationBoundary>
  );
}
