export type OptionalLink = { label: string; href: string | null; download?: boolean };
export type ScreenshotAsset = {
  src: string | null;
  alt: string;
  label: string;
  width: number;
  height: number;
};

const configuredOrigin = process.env.NEXT_PUBLIC_SITE_URL?.trim();
function publicOrigin(value: string | undefined): string | null {
  if (!value) return null;
  const url = new URL(value);
  if (url.protocol !== "https:" || ["localhost", "127.0.0.1"].includes(url.hostname)) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be the real public HTTPS origin.");
  }
  return url.origin;
}

export const site = {
  url: publicOrigin(configuredOrigin),
  title: "Osama Hamdy — Software Engineer & Product Builder",
  description: "Portfolio of Osama Hamdy, a software engineer and product-minded builder from Egypt focused on mobile development, backend systems, AI, and real-world digital products.",
};

export const person = {
  name: "Osama Hamdy",
  role: "Software Engineer & Product Builder",
  location: "Egypt",
  headline: "I build products people actually use.",
  introduction: "I’m Osama, a software engineer and product-minded builder from Egypt. I work across mobile, backend, and product to turn real problems into things people can use.",
  education: { university: "Cairo University", faculty: "Faculty of Commerce · English Section", year: "2024" },
  links: [
    { label: "LinkedIn", href: null },
    { label: "GitHub", href: null },
    { label: "Email me", href: null },
    { label: "Download CV", href: null, download: true },
  ] satisfies OptionalLink[],
};

export const navigation = [
  { label: "Home", id: "home" },
  { label: "Work", id: "work" },
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Journey", id: "journey" },
  { label: "Contact", id: "contact" },
];

export const metro = {
  name: "Egy Metro Guide",
  previousName: "Egypt Metro",
  route: "/work/egy-metro-guide/",
  downloads: "250K+",
  // Publish a rating only once its value AND platform are confirmed.
  rating: null as { value: string; platform: string } | null,
  platforms: ["Google Play", "App Store"],
  storeLinks: [
    { label: "Google Play", href: null },
    { label: "App Store", href: null },
  ] satisfies OptionalLink[],
  summary: "A simpler way through Cairo. Built to help metro riders find their route, know their direction, and get where they need to go.",
  stack: ["Flutter", "Dart", "Laravel", "MySQL"],
  screenshots: [
    { src: null, alt: "Egy Metro Guide route selection screen", label: "Route selection", width: 780, height: 1688 },
    { src: null, alt: "Egy Metro Guide journey details screen", label: "Journey details", width: 780, height: 1688 },
    { src: null, alt: "Egy Metro Guide nearest station screen", label: "Nearest station", width: 780, height: 1688 },
  ] satisfies ScreenshotAsset[],
  journey: ["Start", "Select destination", "Calculate route", "View journey", "Navigate"],
  features: [
    { icon: "route", title: "Route planning", text: "Find a route between Cairo Metro stations." },
    { icon: "direction", title: "Direction guidance", text: "Know which direction to travel, including when changing lines." },
    { icon: "stations", title: "Station count", text: "See how many stations are part of the journey." },
    { icon: "clock", title: "Estimated time", text: "Get an estimate of the journey duration." },
    { icon: "ticket", title: "Ticket information", text: "Find relevant ticket pricing for the trip." },
    { icon: "pin", title: "Nearest station", text: "Find a nearby metro station to start the journey." },
    { icon: "map", title: "Google Maps navigation", text: "Navigate toward a station with Google Maps." },
    { icon: "offline", title: "Offline experience", text: "Use local route data where offline access is supported." },
    { icon: "moon", title: "Dark mode", text: "Use the app with a dark appearance." },
    { icon: "language", title: "English support", text: "Access the experience in English." },
  ],
  architecture: [
    { name: "Rider", detail: "A journey to make", icon: "user" },
    { name: "Mobile app", detail: "Flutter / Dart", icon: "phone" },
    { name: "REST API", detail: "API layer", icon: "code" },
    { name: "Backend", detail: "PHP / Laravel", icon: "server" },
    { name: "Database", detail: "MySQL", icon: "database" },
  ],
  services: ["Local / offline data", "Firebase / FCM", "Google Maps", "RevenueCat", "AdMob"],
  editorialNotes: [
    { title: "A product decision", prompt: "Add one actual user problem, the options considered, and why a particular solution was chosen." },
    { title: "An engineering tradeoff", prompt: "Add a concrete example from API design, offline data, performance, or maintaining compatibility." },
    { title: "A lesson from production", prompt: "Add a specific release, policy requirement, or piece of user feedback—and what changed because of it." },
  ],
};

export const principles = [
  { title: "Build", text: "Learn by making something real." },
  { title: "Ship", text: "Put working software in people’s hands." },
  { title: "Learn", text: "Stay curious about users and technology." },
  { title: "Iterate", text: "Keep improving after the first release." },
  { title: "Own", text: "Take responsibility from idea to launch." },
];

export const books = [
  { title: "Continuous Discovery Habits", author: "Teresa Torres" },
  { title: "Inspired", author: "Marty Cagan" },
  { title: "The Power of Habit", author: "Charles Duhigg" },
  { title: "Good Strategy Bad Strategy", author: "Richard Rumelt" },
  { title: "The Courage to Be Disliked", author: "Ichiro Kishimi & Fumitake Koga" },
];

export const skills = [
  { category: "Mobile", context: "Built with", items: ["Flutter", "Dart", "Android", "iOS"] },
  { category: "Backend", context: "Built with", items: ["PHP", "Laravel", "REST APIs", "MySQL", "API design", "Database design"] },
  { category: "Services & APIs", context: "Worked with", items: ["Firebase", "Firebase Cloud Messaging", "Google Maps API", "RevenueCat", "AdMob", "Local / offline data"] },
  { category: "Product & Engineering", context: "Studying & applying", items: ["Product discovery", "UX thinking", "Analytics & KPIs", "Experimentation", "Product strategy", "Roadmaps & backlogs", "User research", "Agile", "Scrum", "Kanban", "Waterfall"] },
  { category: "AI", context: "Exploring", items: ["LLMs", "RAG", "Vector databases", "AI agents", "AI-assisted development"] },
];

export const journey = [
  { label: "Build", title: "Learn by doing", text: "Turn a real problem into working software." },
  { label: "Ship", title: "Egy Metro Guide", text: "Launch a consumer app on Android and iOS." },
  { label: "Grow", title: "250K+ downloads", text: "Keep maintaining a product used in the real world." },
  { label: "Understand", title: "Think product", text: "Explore discovery, behavior, and what makes a product useful." },
  { label: "Explore", title: "New possibilities", text: "Learn about AI, RAG, and agent-assisted development." },
  { label: "Today", title: "Keep building", text: "Grow at the intersection of engineering and product." },
];
