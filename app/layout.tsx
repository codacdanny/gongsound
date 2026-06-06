import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Fraunces, Inter } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["italic", "normal"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Gongsound Entertainment — We Amplify Culture",
  description:
    "A culturally rooted entertainment company from Benin City, Edo State — discovering, developing and delivering world-class talent and experiences that celebrate who we are.",
  metadataBase: new URL("https://gongsound.com"),
  openGraph: {
    title: "Gongsound Entertainment — We Amplify Culture",
    description:
      "Record label, artist management, music production, events & tours. The journey begins at home.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0807",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${serif.variable} ${sans.variable}`}
    >
      <body className="grain antialiased">{children}</body>
    </html>
  );
}
