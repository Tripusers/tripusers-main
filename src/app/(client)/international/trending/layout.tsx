import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trending",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
