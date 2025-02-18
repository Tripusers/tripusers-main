import { getInternationalPackagesSlug } from "@/sanity/sanity-utils";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    internationalPackages: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { internationalPackages: slug } = await params;
  const meta = await getInternationalPackagesSlug(slug);
  return {
    title: meta.title,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
