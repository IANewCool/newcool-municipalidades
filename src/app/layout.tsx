import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Municipalidades Chile | NewCooltura Informada",
  description: "Buscador de municipalidades, tramites municipales y calculadoras de patentes y permisos en Chile",
  keywords: ["municipalidades", "tramites municipales", "patente comercial", "permisos", "alcaldia"],
  openGraph: {
    title: "Municipalidades Chile - NewCooltura Informada",
    description: "Tramites municipales y patentes",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
