import "./globals.css";
import { SITE_URL, pageMetadata } from "./seo";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  ...pageMetadata({
    title: "Faris — Full-Stack Developer & Automation Engineer",
    description:
      "Full-stack developer and automation engineer in Lahore, Pakistan. I build web apps, e-commerce platforms, and Python automation tools for real business impact.",
    path: "/",
  }),
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
