import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://mirit.org"),
  applicationName: "MIRIT",
  title: "MIRIT — Research, Culture & Innovation",
  description:
    "MIRIT connects research, culture and technology through international programmes, practical research and purposeful digital solutions.",
  keywords: [
    "MIRIT",
    "research",
    "cultural exchange",
    "education",
    "digital innovation",
  ],
  authors: [{ name: "MIRIT", url: "https://mirit.org" }],
  creator: "MIRIT",
  publisher: "MIRIT",
  category: "education",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    siteName: "MIRIT",
    title: "MIRIT — Research, Culture & Innovation",
    description:
      "MIRIT connects research, culture and technology through international programmes, practical research and purposeful digital solutions.",
    url: "https://mirit.org",
  },
  twitter: {
    card: "summary",
    title: "MIRIT — Research, Culture & Innovation",
    description:
      "MIRIT connects research, culture and technology through international programmes, practical research and purposeful digital solutions.",
  },
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
