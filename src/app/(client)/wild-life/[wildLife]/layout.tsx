import { getWildLifeSlug } from "@/sanity/sanity-utils";
import { Metadata } from "next";

type Props = {
  params: { wildLife: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.wildLife;

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
