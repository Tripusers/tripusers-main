import { getWildlifePackagesSlug } from "@/sanity/sanity-utils";
import { Metadata } from "next";

type Props = {
  params: {
    wildLifePackage: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.wildLifePackage;

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
