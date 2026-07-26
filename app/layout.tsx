import type { Metadata, Viewport } from "next";
import { DM_Sans, Manrope, Anton } from "next/font/google";
import "./globals.css";

// Public origin, used for Open Graph / Twitter card URLs. Deriving it from
// request headers would opt the whole route out of static generation, so it is
// configured instead. Set NEXT_PUBLIC_SITE_URL once the site is deployed; the
// fallback only keeps metadata valid while it is not.
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "https://kakros.id";

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
  const socialImage = new URL("/og.34e120f8.webp", siteUrl).toString();

  return {
    metadataBase: siteUrl,
    title: "Rosidah Rahmati | Portfolio",
    description:
      "Web systems, data work, and playable experiments — built end to end, from the problem to the running product.",
    authors: [{ name: "Rosidah Rahmati" }],
    keywords: [
      "Rosidah Rahmati",
      "Portfolio",
      "Web Development",
      "Laravel",
      "React",
      "Data Analysis",
    ],
    openGraph: {
      title: "Rosidah Rahmati | Portfolio",
      description: "Web systems, data work, and playable experiments — built end to end, from the problem to the running product.",
      type: "website",
      url: siteUrl,
      images: [{ url: socialImage, width: 1200, height: 630, alt: "Portfolio Rosidah Rahmati" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Rosidah Rahmati | Portfolio",
      description: "Web systems, data work, and playable experiments — built end to end, from the problem to the running product.",
      images: [socialImage],
    },
  };
})();

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable} ${anton.variable}`}>
      <body>
        {/* Runs before first paint, so a returning visitor sees content
            immediately instead of waiting for React to hydrate. The same flag
            is what tells Portfolio to skip mounting the intro at all. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'try{if(sessionStorage.getItem("rr-intro-seen")==="1")' +
              'document.documentElement.classList.add("intro-done")}catch(e){}',
          }}
        />
        {children}
      </body>
    </html>
  );
}
