// Essentials
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

// Contexts
import { ResultsProvider } from "@/app/(contexts)/Results";

// Styles
import "./globals.scss";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Artaist | Generate AI Art",
  description: "Generate multiple AI art pieces.",
  icons: {
    icon: "./favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.className}>
      <body>
        <ResultsProvider>
          {children}
        </ResultsProvider>
      </body>
    </html>
  );
}
