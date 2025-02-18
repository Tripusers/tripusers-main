export const metadata = {
  title: {
    default: "Special Offers",
    template: "%s | Special Offers | tripusers.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
