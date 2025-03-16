import type { Metadata } from 'next';
import NotFoundSection from './_sections/NotFound';

export const metadata: Metadata = {
  title: 'What do you want? | Chainmind',
};

export default function NotFound() {
  return <NotFoundSection />;
}
