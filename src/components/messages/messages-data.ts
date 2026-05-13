export type PresenceStatus = "online" | "away" | "offline";
export type MessageDirection = "incoming" | "outgoing";

export type ChatMessage = {
  id: string;
  author: MessageDirection;
  body: string;
  time: string;
};

export type Conversation = {
  id: string;
  name: string;
  handle: string;
  title: string;
  preview: string;
  timestamp: string;
  unread: number;
  status: PresenceStatus;
  avatar: string;
  accent: string;
  role: string;
  location: string;
  lastSeen: string;
  tags: string[];
  sharedMedia: string[];
  messages: ChatMessage[];
};

export const initialConversations: Conversation[] = [
  {
    id: "maya",
    name: "Maya Chen",
    handle: "@maya.design",
    title: "Product design sync",
    preview: "I pushed the new onboarding frames. Want to review them together?",
    timestamp: "2m",
    unread: 2,
    status: "online",
    avatar: "MC",
    accent: "from-cyan-500 to-blue-600",
    role: "Lead Product Designer",
    location: "Toronto, Canada",
    lastSeen: "Active now",
    tags: ["Design", "Figma", "Flow review"],
    sharedMedia: ["Onboarding-v4.fig", "Motion-notes.pdf", "Hero-capture.png"],
    messages: [
      {
        id: "maya-1",
        author: "incoming",
        body: "I pushed the new onboarding frames. Want to review them together?",
        time: "09:12",
      },
      {
        id: "maya-2",
        author: "outgoing",
        body: "Yes, I’m free in 10. I also want to check the CTA spacing on mobile.",
        time: "09:14",
      },
      {
        id: "maya-3",
        author: "incoming",
        body: "Perfect. I’ll keep the annotations open so we can move fast.",
        time: "09:15",
      },
    ],
  },
  {
    id: "niko",
    name: "Niko Alvarez",
    handle: "@niko.codes",
    title: "Launch checklist",
    preview: "The release candidate looks clean. Only one accessibility pass left.",
    timestamp: "8m",
    unread: 0,
    status: "away",
    avatar: "NA",
    accent: "from-fuchsia-500 to-violet-600",
    role: "Frontend Engineer",
    location: "Madrid, Spain",
    lastSeen: "Seen 8m ago",
    tags: ["Accessibility", "Next.js", "QA"],
    sharedMedia: ["release-checklist.md", "a11y-notes.txt"],
    messages: [
      {
        id: "niko-1",
        author: "incoming",
        body: "The release candidate looks clean. Only one accessibility pass left.",
        time: "08:46",
      },
      {
        id: "niko-2",
        author: "outgoing",
        body: "Nice. I’ll review focus states and keyboard flow this afternoon.",
        time: "08:47",
      },
    ],
  },
  {
    id: "sasha",
    name: "Sasha Park",
    handle: "@sasha.loop",
    title: "Community moderation",
    preview: "We should pin the new welcome message to the top of the channel.",
    timestamp: "21m",
    unread: 5,
    status: "online",
    avatar: "SP",
    accent: "from-emerald-500 to-teal-600",
    role: "Community Manager",
    location: "Seoul, Korea",
    lastSeen: "Live now",
    tags: ["Moderation", "Community", "Announcements"],
    sharedMedia: ["welcome-copy.docx", "community-playbook.pdf"],
    messages: [
      {
        id: "sasha-1",
        author: "incoming",
        body: "We should pin the new welcome message to the top of the channel.",
        time: "08:22",
      },
      {
        id: "sasha-2",
        author: "outgoing",
        body: "Agreed. I’ll also add a quick reply block for new members.",
        time: "08:26",
      },
      {
        id: "sasha-3",
        author: "incoming",
        body: "Perfect, that will cut down on repeat questions.",
        time: "08:27",
      },
    ],
  },
  {
    id: "amara",
    name: "Amara Singh",
    handle: "@amara.motion",
    title: "Motion review",
    preview: "The transitions feel smooth. We just need a stronger exit state.",
    timestamp: "1h",
    unread: 0,
    status: "offline",
    avatar: "AS",
    accent: "from-orange-500 to-rose-600",
    role: "Creative Director",
    location: "London, UK",
    lastSeen: "Offline for 1h",
    tags: ["Motion", "Review", "Polish"],
    sharedMedia: ["exit-state.mp4", "motion-frames.png"],
    messages: [
      {
        id: "amara-1",
        author: "incoming",
        body: "The transitions feel smooth. We just need a stronger exit state.",
        time: "07:10",
      },
      {
        id: "amara-2",
        author: "outgoing",
        body: "I’ll tighten the timing curve and add a little more depth.",
        time: "07:14",
      },
    ],
  },
  {
    id: "leo",
    name: "Leo Bennett",
    handle: "@leo.research",
    title: "Weekly planning",
    preview: "Let’s keep the roadmap lightweight and ship the core experiments first.",
    timestamp: "3h",
    unread: 1,
    status: "online",
    avatar: "LB",
    accent: "from-violet-500 to-indigo-600",
    role: "Product Strategist",
    location: "New York, USA",
    lastSeen: "Online",
    tags: ["Roadmap", "Experiments", "Planning"],
    sharedMedia: ["roadmap-q2.pdf", "experiment-matrix.csv"],
    messages: [
      {
        id: "leo-1",
        author: "incoming",
        body: "Let’s keep the roadmap lightweight and ship the core experiments first.",
        time: "05:44",
      },
      {
        id: "leo-2",
        author: "outgoing",
        body: "That keeps the team focused. I’ll update the board today.",
        time: "05:47",
      },
    ],
  },
];