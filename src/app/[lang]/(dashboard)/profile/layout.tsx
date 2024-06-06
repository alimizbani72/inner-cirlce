import ProfileDialog from "@app/_components/ProfileDialog";
import type { LayoutProps } from "@app/layout";

export default async function ProfileLayout({ children }: LayoutProps) {
  return <ProfileDialog>{children}</ProfileDialog>;
}
