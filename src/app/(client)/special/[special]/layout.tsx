import { getSpecialSlug } from "@/sanity/sanity-utils";
import { Metadata } from "next";

type Props = {
  params: Promise<{ special: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { special: slug } = await params;
  const meta = await getSpecialSlug(slug);
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
