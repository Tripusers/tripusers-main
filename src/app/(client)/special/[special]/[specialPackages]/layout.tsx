import { getSpecialPackagesSlug } from "@/sanity/sanity-utils";
import { Metadata } from "next";
import { use } from "react";

type Props = {
  params: Promise<{
    specialPackages: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { specialPackages: slug } = use(params);
  const meta = await getSpecialPackagesSlug(slug);
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
