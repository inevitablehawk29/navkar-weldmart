import type { Metadata, Viewport } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { MobileStickyQuote } from "@/components/layout/mobile-sticky-quote";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
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
    url: "https://navkarweldmart.vercel.app",
    siteName: "Navkar Weldmart",
    title: "Navkar Weldmart — Steel Fabrication & Structural Solutions",
    description:
      "End-to-end steel fabrication and material supply for residential, commercial, and industrial projects across Madhya Pradesh.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Navkar Weldmart Open Graph Image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Navkar Weldmart — Steel Fabrication & Structural Solutions",
    description:
      "End-to-end steel fabrication and material supply across Madhya Pradesh since 2012.",
    images: ["/og-image.jpg"],
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
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Navkar Weldmart",
              description:
                "Trusted provider of steel fabrication, structural solutions, and material supply in Indore, Madhya Pradesh.",
              url: "https://navkarweldmart.vercel.app",
              telephone: "+919669769760",
              email: "navkarweldmart@gmail.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Indore",
                addressRegion: "Madhya Pradesh",
                addressCountry: "IN",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 22.7196,
                longitude: 75.8577,
              },
              foundingDate: "2012",
              areaServed: ["Indore", "Bhopal", "Madhya Pradesh"],
              sameAs: [],
            }),
          }}
        />
      </head>
      <body className="min-h-screen flex flex-col antialiased">
        <TooltipProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <MobileStickyQuote />
        </TooltipProvider>
      </body>
    </html>
  );
}
