import { Metadata } from "next";
import { getInternationalSlug } from "@/sanity/sanity-utils";

type Props = {
  params: Promise<{ international: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { international: slug } = await params;
  const meta = await getInternationalSlug(slug);
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
