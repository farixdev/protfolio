import "./globals.css";

export const metadata = {
  title: "Faris | Portfolio",
  description: "Web designer and front-end developer based in Pakistan",
  icons: {
    icon: "/icons/logo-header-01.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}