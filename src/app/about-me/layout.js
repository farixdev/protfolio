import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "About | Faris",
  description:
    "About Faris — full-stack developer and automation engineer, currently studying Software Engineering at Superior University, Lahore.",
  path: "/about-me",
});

export default function AboutMeLayout({ children }) {
  return children;
}
