import type { Metadata } from "next";

// Private per-client page: keep it out of search results and out of
// the site navigation. Clients reach it only through the signed link
// in their welcome email.
export const metadata: Metadata = {
  title: "Set up your session | Rashad Salaam",
  description: "Private setup page for a booked advisory hour.",
  robots: { index: false, follow: false },
};

export default function IntakeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
