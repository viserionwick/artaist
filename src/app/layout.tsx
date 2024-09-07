// Essentials
import type { Metadata } from "next";

// Contexts
import { ResultsProvider } from "@/app/(contexts)/Results";

// Styles
import "./globals.css";

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
    <html lang="en">
      <body>
        <ResultsProvider>
          {children}
        </ResultsProvider>
      </body>
    </html>
  );
}
