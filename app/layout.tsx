import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans, Noto_Sans_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const notoSans = Noto_Sans({
  variable: "--font-noto",
  subsets: ["latin"],
});

const notoSansDisplay = Noto_Sans_Display({
  variable: "--font-noto-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ridons | Set your price. Hop on. Go.",
  description:
    "Make an offer. A motari accepts. The price is locked, and your moto is on its way. Ridons moto rides in Kigali.",
};

export const viewport: Viewport = {
  themeColor: "#c91d22",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSans.variable} ${notoSansDisplay.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
