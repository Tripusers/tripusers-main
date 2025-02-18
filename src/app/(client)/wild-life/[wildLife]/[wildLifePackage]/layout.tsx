import { getWildlifePackagesSlug } from "@/sanity/sanity-utils";
import { Metadata } from "next";

type Props = {
  params: Promise<{
    wildLifePackage: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { wildLifePackage: slug } = await params;

  const meta = await getWildlifePackagesSlug(slug);
  return {
    title: {
      default: meta.title,
      template: `%s | ${meta.title} | tripusers.com`,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
