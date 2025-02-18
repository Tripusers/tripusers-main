export const metadata = {
  title: {
    default: "Wildlife",
    template: "%s | Wildlife | tripusers.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
