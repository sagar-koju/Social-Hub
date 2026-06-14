import { initialSettingsData } from "./settings-data";
import type { ApiKey, SettingsData } from "./settings-types";

const latency = (ms = 450) => new Promise((resolve) => setTimeout(resolve, ms));

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T;

let settingsStore = clone(initialSettingsData);

export async function getSettingsSnapshot(): Promise<SettingsData> {
  await latency(200);
  return clone(settingsStore);
}

export async function saveSettingsSnapshot(next: SettingsData): Promise<SettingsData> {
  await latency();
  settingsStore = clone(next);
  return clone(settingsStore);
}

export async function checkUsernameAvailability(username: string): Promise<boolean> {
  await latency(250);
  const normalized = username.trim().toLowerCase();
  return normalized.length >= 3 && !normalized.includes("taken") && !normalized.includes("admin");
}

export async function createApiKey(name: string): Promise<ApiKey> {
  await latency();
  const newKey: ApiKey = {
    id: `key-${Date.now()}`,
    name,
    createdAt: new Date().toISOString().slice(0, 10),
    lastUsed: "Never",
    status: "Active",
    preview: `sk_live_${Math.random().toString(36).slice(2, 6)}...${Math.random().toString(36).slice(2, 6)}`,
    revealed: true,
  };

  settingsStore.apiKeys = [newKey, ...settingsStore.apiKeys];
  return clone(newKey);
}
