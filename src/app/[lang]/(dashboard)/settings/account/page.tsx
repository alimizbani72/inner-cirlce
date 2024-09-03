import { getQueryClient } from "@app/_providers/customQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import AccountSection from "./_section";

export default async function AccountPage() {
  const queryClient = getQueryClient();
  await Promise.all([]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AccountSection />
    </HydrationBoundary>
  );
}
