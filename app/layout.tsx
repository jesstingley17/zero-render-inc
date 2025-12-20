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
  title: "ZeroRender - Premier Web Design Studio & Digital Design Agency",
  description:
    "ZeroRender is a premier web design studio and digital design agency creating bespoke websites and brands. As a leading branding studio, we build digital products for startups and small businesses.",
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-dark-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/icon.svg",
  },
  alternates: {
    canonical: "https://www.zero-render.com",
  },
  openGraph: {
    title: "ZeroRender - Premier Web Design Studio & Digital Design Agency",
    description:
      "ZeroRender is a premier web design studio and digital design agency creating bespoke websites and brands. As a leading branding studio, we build digital products for startups and small businesses.",
    url: "https://www.zero-render.com",
    siteName: "ZeroRender",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroRender - Premier Web Design Studio & Digital Design Agency",
    description:
      "ZeroRender is a premier web design studio and digital design agency creating bespoke websites and brands. As a leading branding studio, we build digital products for startups and small businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "msvalidate.01": "D50DA7562A6EE982BE1A451B07EE59FB",
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
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5M3Q4WHN');
          `}
        </Script>
        <Script id="microsoft-clarity" type="text/javascript" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "uo291mbuhk");
          `}
        </Script>
        {/* Google Ads - Load only one gtag.js and configure both IDs */}
        <Script src="https://www.googletagmanager.com/gtag/js?id=AW-17815193591" strategy="lazyOnload" />
        <Script id="google-ads-config" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-17815193591');
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
            src="https://www.googletagmanager.com/ns.html?id=GTM-5M3Q4WHN"
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
