export const metadata = {
  title: {
    default: "Best of India",
    template: "%s | Best of India | tripusers.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
