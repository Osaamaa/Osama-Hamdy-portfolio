import { ActionLink } from "@/components/ui";

export default function NotFound() {
  return <main id="main" className="container not-found"><p className="eyebrow">404 / A SMALL DETOUR</p><h1>This stop<br />doesn’t exist.</h1><p>Let’s get you back to the work.</p><ActionLink href="/">Back home</ActionLink></main>;
}
