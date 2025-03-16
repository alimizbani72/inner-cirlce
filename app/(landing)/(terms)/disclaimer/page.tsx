import type { Metadata } from 'next';
import DisclaimerSection from './_section';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Disclaimer',
};

export default async function Disclaimer() {
  return <DisclaimerSection />;
}
