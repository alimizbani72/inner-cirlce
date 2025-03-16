'use client';

import { notFound, useSearchParams } from 'next/navigation';
import CheckoutQRWalletSection from '.';

const WalletWrapper = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const planType = searchParams.get('plan_type');

  if (!(id && planType)) {
    return notFound();
  }
  return <CheckoutQRWalletSection planType={planType} id={id} />;
};
export default WalletWrapper;
