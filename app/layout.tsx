import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope, Anton } from "next/font/google";
import "./globals.css";

// Static site URL. Reading request headers here would opt the whole route out of
// static generation, so the origin is configured instead of derived per request.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-v2-byochiram.vercel.app";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-dm-sans",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
  variable: "--font-manrope",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-anton",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export const metadata: Metadata = (() => {
  const siteUrl = new URL(SITE_URL);
  const socialImage = new URL("/og.webp", siteUrl).toString();

  return {
    metadataBase: siteUrl,
    title: "Rosidah Rahmati | Software Developer",
    description:
      "Portfolio of Rosidah Rahmati, an Informatics fresh graduate in Batam who builds practical web-based systems and software products.",
    authors: [{ name: "Rosidah Rahmati" }],
    keywords: [
      "Rosidah Rahmati",
      "Software Developer",
      "Fresh Graduate Informatics",
      "Batam",
      "Laravel Developer",
      "Web Developer",
    ],
    openGraph: {
      title: "Rosidah Rahmati | Software Developer",
      description: "Fresh graduate. Practical builder. Open to entry-level IT opportunities.",
      type: "website",
      url: siteUrl,
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Rosidah Rahmati — Software Developer" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rosidah Rahmati | Software Developer",
      description: "Fresh graduate. Practical builder. Open to entry-level IT opportunities.",
      images: [socialImage],
    },
  };
})();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable} ${anton.variable}`}>
      <body>{children}</body>
    </html>
  );
}
