import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { OttoPixel } from "@/components/otto-pixel"
import Script from "next/script"
import "./globals.css"

const geist = Geist({ subsets: ["latin"] })
const geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL("https://www.zero-render.com"),
  title: "ZeroRender - AI-Powered Digital Experiences for Small Business",
  description:
    "ZeroRender, Inc. is a design-tech startup building modern, AI-powered digital experiences for small businesses. We create fast, accessible websites, automated workflows, and sleek brand identities that help founders launch and scale with confidence.",
  generator: "v0.app",
  icons: {
    icon: "/logo_bw_inverted.png",
    apple: "/logo_bw_inverted.png",
  },
  alternates: {
    canonical: "https://www.zero-render.com",
  },
  openGraph: {
    title: "ZeroRender - AI-Powered Digital Experiences for Small Business",
    description:
      "ZeroRender, Inc. is a design-tech startup building modern, AI-powered digital experiences for small businesses. We create fast, accessible websites, automated workflows, and sleek brand identities that help founders launch and scale with confidence.",
    url: "https://www.zero-render.com",
    siteName: "ZeroRender",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroRender - AI-Powered Digital Experiences for Small Business",
    description:
      "ZeroRender, Inc. is a design-tech startup building modern, AI-powered digital experiences for small businesses. We create fast, accessible websites, automated workflows, and sleek brand identities that help founders launch and scale with confidence.",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="google-tag-manager" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NDVQ85KM');
          `}
        </Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-16828943917" strategy="lazyOnload" />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-16828943917');
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-16828943917/GcGdCJiMnNMbEK2c1dg-',
                  'event_callback': callback
              });
              return false;
            }
            function gtag_report_phone_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                  'send_to': 'AW-16828943917/jZPSCJHwtNMbEK2c1dg-',
                  'value': 1.0,
                  'currency': 'USD',
                  'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
      </head>
      <body className={`${geist.className} antialiased`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NDVQ85KM"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <OttoPixel />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
