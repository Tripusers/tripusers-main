export const metadata = {
  title: {
    default: "International",
    template: "%s | International | tripusers.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
