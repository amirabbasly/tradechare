import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DEFAULT_DESC, SITE_KEYWORDS, SITE_URL } from "@/lib/site";
import { UIProvider } from "@/components/ui";
import { OrganizationJsonLd } from "@/components/Seo";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Widgets from "@/components/Widgets";

export const viewport: Viewport = {
  themeColor: "#107242",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "تریدچاره | شرکت بازرگانی و ترخیص کالا با ۲۰ سال سابقه",
    template: "%s | تریدچاره",
  },
  description: DEFAULT_DESC,
  keywords: SITE_KEYWORDS,
  authors: [{ name: "تریدچاره", url: SITE_URL }],
  creator: "تریدچاره",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: SITE_URL,
    siteName: "تریدچاره",
    title: "تریدچاره | شرکت بازرگانی و ترخیص کالا با ۲۰ سال سابقه",
    description: DEFAULT_DESC,
    images: [{ url: "/images/hero-port.png", width: 1200, height: 630, alt: "تریدچاره" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "تریدچاره | شرکت بازرگانی و ترخیص کالا",
    description: DEFAULT_DESC,
    images: ["/images/hero-port.png"],
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fa" dir="rtl" className="h-full scroll-smooth">
      <body className="min-h-full bg-white font-sans text-stone-800 antialiased">
        <OrganizationJsonLd />
        <UIProvider>
          <Navbar />
          {children}
          <Footer />
          <Widgets />
        </UIProvider>
      </body>
    </html>
  );
}
