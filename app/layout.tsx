import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope, Anton } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

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

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const siteUrl = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", siteUrl).toString();

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
      images: [{ url: socialImage, width: 1731, height: 909, alt: "Rosidah Rahmati — Software Developer" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rosidah Rahmati | Software Developer",
      description: "Fresh graduate. Practical builder. Open to entry-level IT opportunities.",
      images: [socialImage],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable} ${anton.variable}`}>
      <body>{children}</body>
    </html>
  );
}
