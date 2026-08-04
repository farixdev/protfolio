// Shared SEO values. Nested metadata fields (openGraph, twitter) are replaced —
// not merged — by child segments, so each route builds its own complete object.
export const SITE_URL = "https://farixdev.vercel.app";

export const OG_IMAGE = {
  url: "/icons/hero4.png",
  width: 1024,
  height: 1024,
  alt: "Faris — Full-Stack Developer & Automation Engineer",
};

export function pageMetadata({ title, description, path }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Faris",
      images: [OG_IMAGE],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE.url],
    },
  };
}
