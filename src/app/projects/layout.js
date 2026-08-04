import { pageMetadata } from "../seo";

export const metadata = pageMetadata({
  title: "Projects | Faris",
  description:
    "Selected projects by Faris — web apps, Flutter apps, scrapers, and automation tools built with Next.js, Python, and Flutter.",
  path: "/projects",
});

export default function ProjectsLayout({ children }) {
  return children;
}
