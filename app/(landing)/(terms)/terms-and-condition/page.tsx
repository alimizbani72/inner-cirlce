import type { Metadata } from 'next';
import TermsSection from './_section';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Terms & Condition',
};

export default async function Terms() {
  return <TermsSection />;
}
