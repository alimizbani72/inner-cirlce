'use client';

import type { Metadata } from 'next';
import ErrorSection from './_sections/Error';

export const metadata: Metadata = {
  title: "We're currently undergoing maintenance. | Chainmind",
};

export default function Error() {
  return <ErrorSection />;
}
