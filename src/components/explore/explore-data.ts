export type TrendingTopic = {
  rank: number;
  topic: string;
  category: string;
  description: string;
  growth: string;
  posts: string;
  badge: "Hot" | "Breakout" | "Rising";
};

export type Creator = {
  id: string;
  name: string;
  handle: string;
  bio: string;
  followers: string;
  mutuals: string[];
  verified?: boolean;
};

export const trendingTopics: TrendingTopic[] = [
  {
    rank: 1,
    topic: "#AISketchbook",
    category: "Design",
    description: "Artists share prompt-to-poster workflows and breakdowns.",
    growth: "+42%",
    posts: "128K posts",
    badge: "Hot",
  },
  {
    rank: 2,
    topic: "#BuildInPublic",
    category: "Startups",
    description: "Founders posting daily traction snapshots and lessons.",
    growth: "+31%",
    posts: "96K posts",
    badge: "Breakout",
  },
  {
    rank: 3,
    topic: "#MotionSystems",
    category: "Product",
    description: "Teams comparing motion tokens and interaction standards.",
    growth: "+19%",
    posts: "74K posts",
    badge: "Rising",
  },
  {
    rank: 4,
    topic: "#CreatorEconomy",
    category: "Culture",
    description: "Monetization experiments from newsletters to live drops.",
    growth: "+16%",
    posts: "58K posts",
    badge: "Rising",
  },
];

export const recommendedCreators: Creator[] = [
  {
    id: "c1",
    name: "Nora Vale",
    handle: "noravale",
    bio: "Product storyteller sharing growth teardown threads.",
    followers: "182K",
    mutuals: ["Maya", "Liam", "Ava"],
    verified: true,
  },
  {
    id: "c2",
    name: "Atlas Studio",
    handle: "atlasstudio",
    bio: "Weekly UI concept drops and prototyping challenges.",
    followers: "91K",
    mutuals: ["Noah", "Zoe"],
    verified: true,
  },
  {
    id: "c3",
    name: "Kian Park",
    handle: "kianpark",
    bio: "Engineering creator focused on front-end architecture.",
    followers: "74K",
    mutuals: ["Ivy", "Maya", "Riya"],
  },
  {
    id: "c4",
    name: "Pixel Orchard",
    handle: "pixelorchard",
    bio: "Visual experiments, color systems, and creative coding.",
    followers: "126K",
    mutuals: ["Ava", "Kai"],
    verified: true,
  },
];

export const interests = [
  "All",
  "For You",
  "Design",
  "Technology",
  "Startups",
  "Photography",
  "Gaming",
  "Marketing",
  "Culture",
  "Web3",
];

export const hashtags = [
  "#UIDesign",
  "#CreatorTips",
  "#NoCode",
  "#SaaS",
  "#MotionUI",
  "#GrowthLoops",
  "#IndieHackers",
  "#FutureOfWork",
];