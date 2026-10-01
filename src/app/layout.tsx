import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyQuote } from "@/components/layout/mobile-sticky-quote";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MotionConfig } from "framer-motion";
import { FramerProvider } from "@/components/providers/framer-provider";
import NextTopLoader from "nextjs-toploader";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#1B1F24",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://navkarweldmart.com"),
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Navkar Weldmart",
  },
  title: {
    default: "Navkar Weldmart — Steel Fabrication & Structural Solutions",
    template: "%s | Navkar Weldmart",
  },
  description:
    "Trusted provider of steel fabrication, structural solutions, and material supply in Indore & Bhopal. Serving residential, commercial, and industrial projects across Madhya Pradesh since 2012.",
  keywords: [
    "steel fabrication",
    "structural fabrication",
    "material supply",
    "Indore",
    "Madhya Pradesh",
    "warehouse structures",
    "industrial sheds",
    "iron fabrication",
    "Navkar Weldmart",
    "steel solutions",
  ],
  authors: [{ name: "Navkar Weldmart" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://navkarweldmart.com",
    siteName: "Navkar Weldmart",
    title: "Navkar Weldmart — Steel Fabrication & Structural Solutions",
    description:
      "End-to-end steel fabrication and material supply for residential, commercial, and industrial projects across Madhya Pradesh.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Navkar Weldmart — Steel Fabrication & Structural Solutions",
    description:
      "End-to-end steel fabrication and material supply across Madhya Pradesh since 2012.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={archivo.variable}>
      <head>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify([
                {
                  "@context": "https://schema.org",
                  "@type": "Organization",
                  "@id": "https://navkarweldmart.com/#organization",
                  name: "Navkar Weldmart",
                  url: "https://navkarweldmart.com",
                  logo: "https://navkarweldmart.com/images/logo_header.webp",
                  contactPoint: {
                    "@type": "ContactPoint",
                    telephone: "+919669769760",
                    contactType: "customer service",
                    email: "navkarweldmart@gmail.com",
                    availableLanguage: ["English", "Hindi"]
                  },
                  sameAs: [
                    "https://www.instagram.com/navkarweldmart/"
                  ]
                },
                {
                  "@context": "https://schema.org",
                  "@type": "LocalBusiness",
                  "@id": "https://navkarweldmart.com/#localbusiness",
                  parentOrganization: { "@id": "https://navkarweldmart.com/#organization" },
                  name: "Navkar Weldmart",
                  description:
                    "Trusted provider of steel fabrication, structural solutions, and material supply in Indore, Madhya Pradesh.",
                  url: "https://navkarweldmart.com",
                  telephone: "+919669769760",
                  email: "navkarweldmart@gmail.com",
                  image: "https://navkarweldmart.com/opengraph-image.jpg",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: "Indore",
                    addressRegion: "Madhya Pradesh",
                    addressCountry: "IN",
                  },
                  foundingDate: "2012",
                  areaServed: ["Indore", "Bhopal", "Madhya Pradesh"]
                },
                {
                  "@context": "https://schema.org",
                  "@type": "WebSite",
                  "@id": "https://navkarweldmart.com/#website",
                  "url": "https://navkarweldmart.com",
                  "name": "Navkar Weldmart",
                  "publisher": { "@id": "https://navkarweldmart.com/#organization" }
                }
              ]),
            }}
          />
      </head>
      <body className="min-h-dvh flex flex-col antialiased">
        <FramerProvider>
          <MotionConfig reducedMotion="user">
            <NextTopLoader
              color="#0C5094"
              height={2}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow={false}
            />
            <TooltipProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <MobileStickyQuote />
              <Analytics />
              <SpeedInsights />
            </TooltipProvider>
          </MotionConfig>
        </FramerProvider>
      </body>
    </html>
  );
}
