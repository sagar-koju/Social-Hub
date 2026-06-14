export const settingsSectionIds = [
  "profile",
  "account",
  "security",
  "notifications",
  "privacy",
  "appearance",
  "locale",
  "billing",
  "connected",
  "apiKeys",
  "storage",
  "support",
] as const;

export type SettingsSectionId = (typeof settingsSectionIds)[number];

export type SettingsSection = {
  id: SettingsSectionId;
  title: string;
  description: string;
};

export type ProfileSettings = {
  avatarUrl: string;
  firstName: string;
  lastName: string;
  username: string;
  bio: string;
  jobTitle: string;
  company: string;
  website: string;
  phoneNumber: string;
};

export type AccountSettings = {
  email: string;
  accountId: string;
  createdAt: string;
  status: "Active" | "Suspended" | "Pending";
  emailVerified: boolean;
};

export type SessionRecord = {
  id: string;
  device: string;
  browser: string;
  ipAddress: string;
  lastActive: string;
};

export type SecuritySettings = {
  twoFactorEnabled: boolean;
  recoveryCodes: string[];
  activeSessions: SessionRecord[];
};

export type NotificationPreferenceGroup = {
  [key: string]: boolean;
};

export type NotificationSettings = {
  email: NotificationPreferenceGroup;
  push: NotificationPreferenceGroup;
  sms: NotificationPreferenceGroup;
};

export type PrivacySettings = {
  profileVisibility: "Public" | "Private" | "Connections Only";
  activityVisibility: {
    onlineStatus: boolean;
    lastSeen: boolean;
    profileViews: boolean;
  };
  dataPermissions: {
    analyticsTracking: boolean;
    personalizedRecommendations: boolean;
    thirdPartyIntegrations: boolean;
  };
};

export type AppearanceSettings = {
  theme: "Light" | "Dark" | "System";
  density: "Compact" | "Comfortable";
  largerText: boolean;
  reducedMotion: boolean;
  highContrast: boolean;
};

export type LocaleSettings = {
  language: string;
  region: string;
  timezone: string;
  dateFormat: string;
  currency: string;
};

export type BillingHistoryItem = {
  invoiceId: string;
  date: string;
  amount: string;
  status: "Paid" | "Pending" | "Failed";
  downloadUrl: string;
};

export type PaymentMethod = {
  id: string;
  label: string;
  cardType: string;
  lastFour: string;
  expiresAt: string;
  isDefault: boolean;
};

export type BillingSettings = {
  planName: string;
  renewalDate: string;
  billingCycle: string;
  status: string;
  paymentMethods: PaymentMethod[];
  history: BillingHistoryItem[];
};

export type ConnectedAccount = {
  id: string;
  name: string;
  provider: string;
  status: "Connected" | "Disconnected" | "Needs Attention";
  kind: "social" | "integration";
};

export type ApiKey = {
  id: string;
  name: string;
  createdAt: string;
  lastUsed: string;
  status: "Active" | "Revoked";
  preview: string;
  revealed: boolean;
};

export type StorageSettings = {
  used: number;
  total: number;
  remaining: number;
};

export type SupportTicket = {
  id: string;
  subject: string;
  status: "Open" | "Resolved" | "Waiting on you";
  updatedAt: string;
};

export type SupportSettings = {
  contactEmail: string;
  tickets: SupportTicket[];
};

export type SettingsData = {
  profile: ProfileSettings;
  account: AccountSettings;
  security: SecuritySettings;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  appearance: AppearanceSettings;
  locale: LocaleSettings;
  billing: BillingSettings;
  connected: ConnectedAccount[];
  apiKeys: ApiKey[];
  storage: StorageSettings;
  support: SupportSettings;
};
