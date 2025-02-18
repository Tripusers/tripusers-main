import { getSpecialSlug } from "@/sanity/sanity-utils";
import { Metadata } from "next";
import { use } from "react";

type Props = {
  params: Promise<{ special: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { special: slug } = use(params);
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
