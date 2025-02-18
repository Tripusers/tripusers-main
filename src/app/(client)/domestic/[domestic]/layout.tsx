import { getDomesticSlug } from "@/sanity/sanity-utils";
import { Metadata } from "next";

type Props = {
  params: Promise<{ domestic: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { domestic: slug } = await params;
  const meta = await getDomesticSlug(slug);
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
