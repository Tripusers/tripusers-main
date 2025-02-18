export const metadata = {
  title: {
    default: "Testimonials",
    template: "%s | Testimonials | tripusers.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
