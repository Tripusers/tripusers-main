import { getTestimonialSlug } from "@/sanity/sanity-utils";
import { Metadata } from "next";

type Props = {
  params: { testimonial: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.testimonial;

  const meta = await getTestimonialSlug(slug);
  return {
    title: meta.title,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
