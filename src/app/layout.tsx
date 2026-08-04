import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MIRIT",
  description: "Education, Culture and Innovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
