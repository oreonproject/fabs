import "./globals.css";
import Providers from "./providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FABS",
  description: "Fucking Awesome Build System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="min-h-screen">
          <header className="border-b border-gray-800 px-6 py-3">FABS</header>
          <main className="p-6">
            <Providers>{children}</Providers>
          </main>
        </div>
      </body>
    </html>
  );
}
