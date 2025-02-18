import { getWildLifeSlug } from "@/sanity/sanity-utils";
import { Metadata } from "next";

type Props = {
  params: Promise<{ wildLife: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { wildLife: slug } = await params;

  const meta = await getWildLifeSlug(slug);
  return {
    title: {
      default: meta.name,
      template: `%s | ${meta.name} | tripusers.com`,
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
