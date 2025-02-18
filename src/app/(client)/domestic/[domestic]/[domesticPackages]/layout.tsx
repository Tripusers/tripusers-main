import { getDomesticPackagesSlug } from "@/sanity/sanity-utils";
import { Metadata } from "next";

type Props = {
  params: {
    domesticPackages: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domesticPackages: slug } = params;
  const meta = await getDomesticPackagesSlug(slug);
  return {
    title: meta.title || "tripusers",
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
