import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SessionRefresher from "./components/SessionRefresh";
import ClientSessionProvider from "./components/ClientSesionProvider";

export const metadata: Metadata = {
  title: "SkillSwap Platform",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ClientSessionProvider>
          <Header />
          <SessionRefresher />
          {children}
          <Footer />
        </ClientSessionProvider>
      </body>
    </html>
  );
}
