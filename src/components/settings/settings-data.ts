import type { SettingsData, SettingsSection } from "./settings-types";

export const settingsSections: SettingsSection[] = [
  {
    id: "profile",
    title: "Profile Settings",
    description: "Edit your public profile, contact details, and bio.",
  },
  {
    id: "account",
    title: "Account Settings",
    description: "Manage your email, account identity, and deletion flow.",
  },
  {
    id: "security",
    title: "Security",
    description: "Update passwords, enable 2FA, and review active sessions.",
  },
  {
    id: "notifications",
    title: "Notifications",
    description: "Choose when and how the product should reach you.",
  },
  {
    id: "privacy",
    title: "Privacy",
    description: "Control visibility, activity signals, and data permissions.",
  },
  {
    id: "appearance",
    title: "Appearance",
    description: "Tune density, motion, and accessibility preferences.",
  },
  {
    id: "locale",
    title: "Language & Region",
    description: "Set language, timezone, and regional formatting.",
  },
  {
    id: "billing",
    title: "Billing & Subscription",
    description: "Review your plan, payment methods, and invoice history.",
  },
  {
    id: "connected",
    title: "Connected Accounts",
    description: "Connect social providers and collaboration tools.",
  },
  {
    id: "apiKeys",
    title: "API Keys",
    description: "Create, copy, rotate, and revoke programmatic access keys.",
  },
  {
    id: "storage",
    title: "Data & Storage",
    description: "Track usage, export your data, and clean up storage.",
  },
  {
    id: "support",
    title: "Help & Support",
    description: "Contact support, submit tickets, and send feedback.",
  },
];

export const languageOptions = ["English", "Spanish", "French"];
export const regionOptions = ["United States", "United Kingdom", "Nepal", "Canada"];
export const timezoneOptions = ["UTC", "Asia/Kathmandu", "America/New_York", "Europe/London"];
export const dateFormatOptions = ["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"];
export const currencyOptions = ["USD", "EUR", "NPR", "GBP"];

export const initialSettingsData: SettingsData = {
  profile: {
    avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=320&q=80",
    firstName: "Ariana",
    lastName: "Stone",
    username: "ariana.stone",
    bio: "Product designer building thoughtful SaaS experiences.",
    jobTitle: "Design Lead",
    company: "Northstar Studio",
    website: "https://northstar.example",
    phoneNumber: "+1 (555) 014-7890",
  },
  account: {
    email: "ariana.stone@northstar.example",
    accountId: "acc_7F4A2C91",
    createdAt: "2023-11-08",
    status: "Active",
    emailVerified: true,
  },
  security: {
    twoFactorEnabled: true,
    recoveryCodes: ["QZ7K-19DJ", "M4TX-22VN", "PL8Q-67AS", "H5NC-40RW"],
    activeSessions: [
      {
        id: "session-1",
        device: "MacBook Pro",
        browser: "Chrome 126",
        ipAddress: "172.16.12.44",
        lastActive: "2 minutes ago",
      },
      {
        id: "session-2",
        device: "iPhone 15",
        browser: "Safari",
        ipAddress: "172.16.12.50",
        lastActive: "Today, 09:42",
      },
    ],
  },
  notifications: {
    email: {
      productUpdates: true,
      securityAlerts: true,
      marketingEmails: false,
    },
    push: {
      newMessages: true,
      mentions: true,
      systemAlerts: true,
    },
    sms: {
      accountAlerts: false,
      loginVerification: true,
    },
  },
  privacy: {
    profileVisibility: "Connections Only",
    activityVisibility: {
      onlineStatus: true,
      lastSeen: false,
      profileViews: true,
    },
    dataPermissions: {
      analyticsTracking: true,
      personalizedRecommendations: true,
      thirdPartyIntegrations: false,
    },
  },
  appearance: {
    theme: "System",
    density: "Comfortable",
    largerText: false,
    reducedMotion: false,
    highContrast: false,
  },
  locale: {
    language: "English",
    region: "United States",
    timezone: "UTC",
    dateFormat: "MM/DD/YYYY",
    currency: "USD",
  },
  billing: {
    planName: "Pro",
    renewalDate: "2026-07-08",
    billingCycle: "Monthly",
    status: "Active",
    paymentMethods: [
      {
        id: "card-1",
        label: "Primary card",
        cardType: "Visa",
        lastFour: "4242",
        expiresAt: "08/28",
        isDefault: true,
      },
    ],
    history: [
      {
        invoiceId: "INV-10421",
        date: "2026-05-08",
        amount: "$29.00",
        status: "Paid",
        downloadUrl: "#",
      },
      {
        invoiceId: "INV-10344",
        date: "2026-04-08",
        amount: "$29.00",
        status: "Paid",
        downloadUrl: "#",
      },
    ],
  },
  connected: [
    { id: "google", name: "Google", provider: "google", status: "Connected", kind: "social" },
    { id: "github", name: "GitHub", provider: "github", status: "Connected", kind: "social" },
    { id: "slack", name: "Slack", provider: "slack", status: "Disconnected", kind: "integration" },
    { id: "notion", name: "Notion", provider: "notion", status: "Needs Attention", kind: "integration" },
  ],
  apiKeys: [
    {
      id: "key-1",
      name: "Production API",
      createdAt: "2026-03-18",
      lastUsed: "Today, 11:12",
      status: "Active",
      preview: "sk_live_91c4...b2f0",
      revealed: false,
    },
    {
      id: "key-2",
      name: "Staging API",
      createdAt: "2026-01-10",
      lastUsed: "Yesterday",
      status: "Active",
      preview: "sk_test_d7a1...c88e",
      revealed: false,
    },
  ],
  storage: {
    used: 28,
    total: 100,
    remaining: 72,
  },
  support: {
    contactEmail: "support@socialhub.example",
    tickets: [],
  },
};
