import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import "./globals.css";
import React from "react";
import { Abhaya_Libre, Open_Sans } from "next/font/google";
import {
  MantineProvider,
  ColorSchemeScript,
  mantineHtmlProps,
} from "@mantine/core";
import { DatesProvider } from "@mantine/dates";
import "dayjs/locale/es";
import { theme } from "../theme";
import { siteInfo } from "./data/site";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { WhatsAppFab } from "./components/WhatsAppFab";

const abhayaLibre = Abhaya_Libre({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-abhaya-libre",
  display: "swap",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(siteInfo.url),
  title: `${siteInfo.name} | ${siteInfo.tagline}`,
  description: siteInfo.description,
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: siteInfo.name,
    title: `${siteInfo.name} | ${siteInfo.tagline}`,
    description: siteInfo.description,
    url: "/",
    images: [
      {
        url: siteInfo.shareImage,
        width: 1500,
        height: 800,
        alt: `${siteInfo.name}, cabañas en Tandil`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteInfo.name} | ${siteInfo.tagline}`,
    description: siteInfo.description,
    images: [siteInfo.shareImage],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  minimumScale: 1,
};

const lodgingJsonLd = {
  "@context": "https://schema.org",
  "@type": "LodgingBusiness",
  name: siteInfo.name,
  description: siteInfo.description,
  url: siteInfo.url,
  email: siteInfo.email,
  telephone: siteInfo.whatsapp,
  image: `${siteInfo.url}${siteInfo.shareImage}`,
  priceRange: "$$",
  checkinTime: "14:00",
  checkoutTime: "11:00",
  petsAllowed: siteInfo.petsAllowed,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Los Aromos 1584",
    addressLocality: "Tandil",
    addressRegion: "Buenos Aires",
    addressCountry: "AR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteInfo.latitude,
    longitude: siteInfo.longitude,
  },
  amenityFeature: [
    "Wi-Fi",
    "Piscina",
    "Desayuno",
    "Estacionamiento",
    "Parrilla individual",
    "Aire acondicionado",
  ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="es"
      {...mantineHtmlProps}
      className={`${abhayaLibre.variable} ${openSans.variable}`}
    >
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(lodgingJsonLd) }}
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="light">
          <DatesProvider settings={{ locale: "es", firstDayOfWeek: 1, weekendDays: [0, 6] }}>
            <a href="#contenido" className="skip-link">
              Saltar al contenido
            </a>
            <Header />
            <main id="contenido">{children}</main>
            <Footer />
            <WhatsAppFab />
          </DatesProvider>
        </MantineProvider>
      </body>
    </html>
  );
}
