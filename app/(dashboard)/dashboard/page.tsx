import type { Metadata } from 'next';
import DashboardSection from './_section/indesx';

// ----------------------------------------------------------------------

export const metadata: Metadata = {
  title: 'Dashboard',
};

export default async function Dashboard() {
  return <DashboardSection />;
}
