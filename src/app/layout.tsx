import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mirit",
  description: "Education, Culture and Innovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(() => { try { const saved = localStorage.getItem('mirit-theme'); const isDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches; document.documentElement.classList.toggle('dark', isDark); } catch {} })()`,
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
