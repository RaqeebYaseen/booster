import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BOOST — Fuel The Pump | $BOOST on Solana",
  description: "The most powerful memecoin on Solana. Grab your BOOST can, fuel the pump, and ride the wave. 0% Tax. 100% LP Locked. Built different.",
  keywords: ["BOOST", "Solana", "memecoin", "pump.fun", "crypto", "token"],
  openGraph: {
    title: "BOOST — Fuel The Pump",
    description: "The most powerful memecoin on Solana. Grab your BOOST can and fuel the pump.",
    type: "website",
    images: ["/icon.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "BOOST — Fuel The Pump",
    description: "The most powerful memecoin on Solana.",
    images: ["/icon.jpeg"],
  },
  icons: {
    icon: "/icon.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
