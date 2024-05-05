// sections
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from 'src/configs/authOptions';
// import { HomeView } from 'src/sections/home/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'CHAINMIND',
};

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return redirect('/auth/sign-in');
  }
  return <p>Home</p>;
}
