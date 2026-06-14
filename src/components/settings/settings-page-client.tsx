"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import type { UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowRightIcon,
  CopyIcon,
  DownloadIcon,
  ExternalLinkIcon,
  EyeIcon,
  GlobeIcon,
  PlusIcon,
  RefreshCwIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  Trash2Icon,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { SettingsLayout } from "./settings-layout";
import { ConfirmationModal } from "./confirmation-modal";
import { checkUsernameAvailability, createApiKey, getSettingsSnapshot, saveSettingsSnapshot } from "./settings-service";
import { settingsSections, languageOptions, regionOptions, timezoneOptions, dateFormatOptions, currencyOptions } from "./settings-data";
import type { ApiKey, SettingsData, SettingsSectionId } from "./settings-types";
import { LoadingButton, PreviewCard, SelectField, TextAreaField, TextField, ToggleField } from "./settings-fields";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  username: z.string().min(3, "Username must be at least 3 characters").regex(/^[a-z0-9._-]+$/i, "Use letters, numbers, dots, underscores, or hyphens only"),
  bio: z.string().min(1, "Bio is required").max(240, "Bio is too long"),
  jobTitle: z.string().min(1, "Job title is required"),
  company: z.string().min(1, "Company is required"),
  website: z.string().url("Enter a valid website URL"),
  phoneNumber: z.string().min(6, "Phone number is required"),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(8, "Use at least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
  })
  .refine((value) => value.newPassword === value.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const deleteSchema = z.object({
  password: z.string().min(1, "Password is required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;
type DeleteFormValues = z.infer<typeof deleteSchema>;

type SettingsPageClientProps = {
  initialData: SettingsData;
};

type FeedbackState = {
  type: "success" | "error";
  message: string;
} | null;

const saveToast = {
  success: "Settings updated successfully.",
  error: "We could not save this change. Please try again.",
};

export function SettingsPageClient({ initialData }: SettingsPageClientProps) {
  const queryClient = useQueryClient();
  const { isError, refetch } = useQuery({
    queryKey: ["settings", "snapshot"],
    queryFn: getSettingsSnapshot,
    initialData,
  });

  const [settings, setSettings] = React.useState<SettingsData>(initialData);
  const [activeSection, setActiveSection] = React.useState<SettingsSectionId>("profile");
  const [feedback, setFeedback] = React.useState<FeedbackState>(null);
  const [avatarPreview, setAvatarPreview] = React.useState(settings.profile.avatarUrl);
  const [avatarFileName, setAvatarFileName] = React.useState<string | null>(null);
  const [apiKeys, setApiKeys] = React.useState<ApiKey[]>(settings.apiKeys);
  const [deleteOpen, setDeleteOpen] = React.useState(false);
  const [revokeOpen, setRevokeOpen] = React.useState<string | null>(null);
  const [createKeyOpen, setCreateKeyOpen] = React.useState(false);
  const [newKeyName, setNewKeyName] = React.useState("Production API");
  const [showSecret, setShowSecret] = React.useState<Record<string, boolean>>({});

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    values: settings.profile,
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const deleteForm = useForm<DeleteFormValues>({
    resolver: zodResolver(deleteSchema),
    defaultValues: { password: "" },
  });

  const profileMutation = useMutation({
    mutationFn: async (values: ProfileFormValues) => {
      const next = { ...settings, profile: { ...settings.profile, ...values, avatarUrl: avatarPreview } };
      return saveSettingsSnapshot(next);
    },
    onMutate: async (values) => {
      const next = { ...settings, profile: { ...settings.profile, ...values, avatarUrl: avatarPreview } };
      setSettings(next);
      queryClient.setQueryData(["settings", "snapshot"], next);
      setFeedback({ type: "success", message: saveToast.success });
      return next;
    },
    onError: () => {
      setFeedback({ type: "error", message: saveToast.error });
      void refetch();
    },
  });

  const passwordMutation = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 400));
    },
    onSuccess: () => {
      passwordForm.reset();
      setFeedback({ type: "success", message: "Password updated." });
    },
    onError: () => setFeedback({ type: "error", message: saveToast.error }),
  });

  const localeMutation = useMutation({
    mutationFn: async (next: SettingsData) => saveSettingsSnapshot(next),
    onMutate: async (next) => {
      setSettings(next);
      queryClient.setQueryData(["settings", "snapshot"], next);
      setFeedback({ type: "success", message: saveToast.success });
    },
    onError: () => {
      setFeedback({ type: "error", message: saveToast.error });
      void refetch();
    },
  });

  const createKeyMutation = useMutation({
    mutationFn: async (name: string) => createApiKey(name),
    onSuccess: (created) => {
      const nextKeys = [created, ...apiKeys];
      setApiKeys(nextKeys);
      setSettings((previous) => ({ ...previous, apiKeys: nextKeys }));
      setFeedback({ type: "success", message: `API key ${created.name} created.` });
      setCreateKeyOpen(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 550));
    },
    onSuccess: () => {
      setFeedback({ type: "success", message: "Account deletion request submitted." });
      setDeleteOpen(false);
      deleteForm.reset();
    },
    onError: () => setFeedback({ type: "error", message: saveToast.error }),
  });

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const nextPreview = URL.createObjectURL(file);
    setAvatarPreview(nextPreview);
    setAvatarFileName(file.name);
  };

  const handleProfileSave = profileForm.handleSubmit((values) => {
    if (values.username.toLowerCase().includes("taken")) {
      profileForm.setError("username", { message: "That username is already in use." });
      setFeedback({ type: "error", message: "Choose a different username." });
      return;
    }

    profileMutation.mutate(values);
  });

  const togglePreference = (section: keyof SettingsData["notifications"], key: string) => {
    const next = {
      ...settings,
      notifications: {
        ...settings.notifications,
        [section]: {
          ...settings.notifications[section],
          [key]: !settings.notifications[section][key as keyof typeof settings.notifications[typeof section]],
        },
      },
    } as SettingsData;

    setSettings(next);
    queryClient.setQueryData(["settings", "snapshot"], next);
    setFeedback({ type: "success", message: saveToast.success });
    void saveSettingsSnapshot(next);
  };

  const togglePrivacy = (path: "activityVisibility" | "dataPermissions", key: string) => {
    const next = {
      ...settings,
      privacy: {
        ...settings.privacy,
        [path]: {
          ...settings.privacy[path],
          [key]: !settings.privacy[path][key as keyof typeof settings.privacy[typeof path]],
        },
      },
    } as SettingsData;

    setSettings(next);
    queryClient.setQueryData(["settings", "snapshot"], next);
    void saveSettingsSnapshot(next);
    setFeedback({ type: "success", message: saveToast.success });
  };

  const toggleAppearance = (path: keyof SettingsData["appearance"], value: SettingsData["appearance"][typeof path]) => {
    const next = { ...settings, appearance: { ...settings.appearance, [path]: value } };
    setSettings(next);
    queryClient.setQueryData(["settings", "snapshot"], next);
    void localeMutation.mutateAsync(next);
  };

  const saveLocale = () => localeMutation.mutate({ ...settings });

  const updateAvailability = async () => {
    const username = profileForm.getValues("username");
    const isAvailable = await checkUsernameAvailability(username);
    if (!isAvailable) {
      profileForm.setError("username", { message: "Username is unavailable." });
      setFeedback({ type: "error", message: "That username is unavailable." });
    }
  };

  const handleCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setFeedback({ type: "success", message: "Copied to clipboard." });
  };

  const handleRevokeSession = (sessionId: string) => {
    const next = {
      ...settings,
      security: {
        ...settings.security,
        activeSessions: settings.security.activeSessions.filter((session) => session.id !== sessionId),
      },
    };
    setSettings(next);
    queryClient.setQueryData(["settings", "snapshot"], next);
    void saveSettingsSnapshot(next);
    setFeedback({ type: "success", message: "Session revoked." });
  };

  const handleRevokeApiKey = (keyId: string) => {
    const nextKeys = apiKeys.map((key) => (key.id === keyId ? { ...key, status: "Revoked" as const } : key));
    setApiKeys(nextKeys);
    setSettings((previous) => {
      const next = { ...previous, apiKeys: nextKeys };
      queryClient.setQueryData(["settings", "snapshot"], next);
      void saveSettingsSnapshot(next);
      return next;
    });
    setRevokeOpen(null);
    setFeedback({ type: "success", message: "API key revoked." });
  };

  const sectionTitle = settingsSections.find((section) => section.id === activeSection)?.title ?? "Settings";
  const statusBadge =
    isError ? (
      <Badge variant="destructive">Connection error</Badge>
    ) : (
      <Badge variant="outline" className="gap-1">
        <ShieldCheckIcon className="size-3" />
        Synced
      </Badge>
    );

  return (
    <SettingsLayout
      title={sectionTitle}
      description="A production-ready settings experience with responsive navigation, validation, and rich account controls."
      activeSection={activeSection}
      onSectionChange={setActiveSection}
      status={statusBadge}
      sidebarFooter={
        <div className="rounded-2xl border border-border/60 bg-muted/40 p-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-2 text-foreground">
            <GlobeIcon className="size-4" />
            Live preview enabled
          </div>
          <p className="mt-2 leading-5">All changes update the local cache immediately and persist to the mock service.</p>
        </div>
      }
    >
      <div className="space-y-4">
        {feedback ? (
          <div
            role="status"
            className={cn(
              "rounded-2xl border px-4 py-3 text-sm shadow-sm",
              feedback.type === "success"
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"
                : "border-destructive/20 bg-destructive/10 text-destructive",
            )}
          >
            {feedback.message}
          </div>
        ) : null}

        {activeSection === "profile" ? (
          <Card className="border-border/60 bg-card/85 shadow-sm">
            <CardHeader className="border-b border-border/60">
              <CardTitle>Profile Settings</CardTitle>
              <CardDescription>Update the public identity shown across the product.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid gap-6 lg:grid-cols-[240px_minmax(0,1fr)]">
                <div className="space-y-4">
                  <div className="overflow-hidden rounded-2xl border border-border/60 bg-muted/40 p-4 text-center">
                    <div
                      aria-hidden="true"
                      className="mx-auto aspect-square w-36 rounded-full bg-cover bg-center"
                      style={{ backgroundImage: `url(${avatarPreview})` }}
                    />
                    <p className="mt-3 text-sm font-medium text-foreground">{settings.profile.firstName} {settings.profile.lastName}</p>
                    <p className="text-xs text-muted-foreground">{avatarFileName ?? settings.profile.username}</p>
                  </div>
                  <label className="block cursor-pointer rounded-xl border border-dashed border-border/70 px-4 py-3 text-center text-sm text-muted-foreground transition hover:border-primary hover:text-foreground">
                    <input type="file" accept="image/*" className="sr-only" onChange={handleAvatarChange} />
                    Upload new photo
                  </label>
                  <p className="text-xs text-muted-foreground">Preview updates immediately before saving.</p>
                </div>

                <form className="space-y-5" onSubmit={handleProfileSave}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField label="First name" required {...profileForm.register("firstName")} error={profileForm.formState.errors.firstName?.message} />
                    <TextField label="Last name" required {...profileForm.register("lastName")} error={profileForm.formState.errors.lastName?.message} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField label="Username" required {...profileForm.register("username")} error={profileForm.formState.errors.username?.message} onBlur={updateAvailability} />
                    <TextField label="Job title" required {...profileForm.register("jobTitle")} error={profileForm.formState.errors.jobTitle?.message} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField label="Company" required {...profileForm.register("company")} error={profileForm.formState.errors.company?.message} />
                    <TextField label="Website" required type="url" {...profileForm.register("website")} error={profileForm.formState.errors.website?.message} />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <TextField label="Phone number" required {...profileForm.register("phoneNumber")} error={profileForm.formState.errors.phoneNumber?.message} />
                    <div />
                  </div>
                  <TextAreaField label="Bio" required rows={4} {...profileForm.register("bio")} error={profileForm.formState.errors.bio?.message} />
                  <div className="flex flex-wrap items-center gap-3">
                    <LoadingButton loading={profileMutation.isPending} type="submit">
                      Save changes
                    </LoadingButton>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        profileForm.reset(settings.profile);
                        setAvatarPreview(settings.profile.avatarUrl);
                        setAvatarFileName(null);
                      }}
                    >
                      Cancel changes
                    </Button>
                  </div>
                </form>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {activeSection === "account" ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="border-border/60 bg-card/85 shadow-sm">
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
                <CardDescription>Identity and account metadata.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <PreviewCard title="Email address" value={settings.account.email} />
                <PreviewCard title="Account ID" value={settings.account.accountId} />
                <PreviewCard title="Created" value={settings.account.createdAt} />
                <PreviewCard title="Status" value={settings.account.status} />
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button>Change email</Button>
                  <Button variant="outline">Verify email</Button>
                  <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
                    Delete account
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card/85 shadow-sm">
              <CardHeader>
                <CardTitle>Deletion flow</CardTitle>
                <CardDescription>Confirm your password before permanently deleting the account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-4 text-sm text-destructive">
                  Deleting the account will remove the profile, content, and connected services. This cannot be undone.
                </div>
                <TextField label="Password confirmation" type="password" required {...deleteForm.register("password")} error={deleteForm.formState.errors.password?.message} />
                <Button variant="destructive" onClick={() => setDeleteOpen(true)}>
                  Continue to deletion
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {activeSection === "security" ? (
          <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="border-border/60 bg-card/85 shadow-sm">
                <CardHeader>
                  <CardTitle>Password management</CardTitle>
                  <CardDescription>Change your password and protect your account.</CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={passwordForm.handleSubmit((values) => passwordMutation.mutate(values))}>
                    <TextField label="Current password" type="password" required {...passwordForm.register("currentPassword")} error={passwordForm.formState.errors.currentPassword?.message} />
                    <TextField label="New password" type="password" required {...passwordForm.register("newPassword")} error={passwordForm.formState.errors.newPassword?.message} />
                    <TextField label="Confirm password" type="password" required {...passwordForm.register("confirmPassword")} error={passwordForm.formState.errors.confirmPassword?.message} />
                    <LoadingButton loading={passwordMutation.isPending} type="submit">
                      Update password
                    </LoadingButton>
                  </form>
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card/85 shadow-sm">
                <CardHeader>
                  <CardTitle>Two-factor authentication</CardTitle>
                  <CardDescription>Enable an extra verification step for sign-in.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between rounded-2xl border border-border/60 p-4">
                    <div>
                      <p className="font-medium text-foreground">Two-factor authentication</p>
                      <p className="text-sm text-muted-foreground">{settings.security.twoFactorEnabled ? "Enabled" : "Disabled"}</p>
                    </div>
                    <Button
                      variant={settings.security.twoFactorEnabled ? "outline" : "default"}
                      onClick={() => {
                        const next = {
                          ...settings,
                          security: {
                            ...settings.security,
                            twoFactorEnabled: !settings.security.twoFactorEnabled,
                          },
                        };
                        setSettings(next);
                        queryClient.setQueryData(["settings", "snapshot"], next);
                        void saveSettingsSnapshot(next);
                      }}
                    >
                      {settings.security.twoFactorEnabled ? "Disable" : "Enable"}
                    </Button>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-[160px_minmax(0,1fr)]">
                    <div className="flex items-center justify-center rounded-2xl border border-dashed border-border/60 bg-muted/30 p-4 text-center text-xs text-muted-foreground">
                      QR code placeholder
                    </div>
                    <div className="space-y-3">
                      <p className="text-sm font-medium text-foreground">Recovery codes</p>
                      <div className="flex flex-wrap gap-2">
                        {settings.security.recoveryCodes.map((code) => (
                          <Badge key={code} variant="outline">
                            {code}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/60 bg-card/85 shadow-sm">
              <CardHeader>
                <CardTitle>Active sessions</CardTitle>
                <CardDescription>Review and revoke devices signed in to the account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {settings.security.activeSessions.map((session) => (
                  <div key={session.id} className="flex flex-col gap-3 rounded-2xl border border-border/60 p-4 md:flex-row md:items-center md:justify-between">
                    <div>
                      <p className="font-medium text-foreground">{session.device}</p>
                      <p className="text-sm text-muted-foreground">
                        {session.browser} · {session.ipAddress} · {session.lastActive}
                      </p>
                    </div>
                    <Button variant="outline" onClick={() => handleRevokeSession(session.id)}>
                      Revoke session
                    </Button>
                  </div>
                ))}
                <Button variant="destructive" onClick={() => setFeedback({ type: "success", message: "Signed out all devices." })}>
                  Sign out all devices
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {activeSection === "notifications" ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {([
              ["Email notifications", "email", settings.notifications.email],
              ["Push notifications", "push", settings.notifications.push],
              ["SMS notifications", "sms", settings.notifications.sms],
            ] as const).map(([title, key, group]) => (
              <Card key={title} className="border-border/60 bg-card/85 shadow-sm">
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>Toggle the notifications you want to receive.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {Object.entries(group).map(([name, enabled]) => (
                    <ToggleField
                      key={name}
                      label={name.replace(/([A-Z])/g, " $1").replace(/^./, (char) => char.toUpperCase())}
                      checked={enabled}
                      onCheckedChange={() => togglePreference(key, name)}
                    />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        ) : null}

        {activeSection === "privacy" ? (
          <div className="space-y-4">
            <Card className="border-border/60 bg-card/85 shadow-sm">
              <CardHeader>
                <CardTitle>Profile visibility</CardTitle>
                <CardDescription>Choose who can discover your profile.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 lg:grid-cols-3">
                {(["Public", "Private", "Connections Only"] as const).map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      const next = { ...settings, privacy: { ...settings.privacy, profileVisibility: option } };
                      setSettings(next);
                      queryClient.setQueryData(["settings", "snapshot"], next);
                      void saveSettingsSnapshot(next);
                    }}
                    className={cn(
                      "rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                      settings.privacy.profileVisibility === option ? "border-primary bg-primary/10" : "border-border/60 hover:border-border",
                    )}
                  >
                    <p className="font-medium text-foreground">{option}</p>
                    <p className="text-sm text-muted-foreground">{option === "Public" ? "Visible to everyone." : option === "Private" ? "Visible only to you." : "Visible to approved connections."}</p>
                  </button>
                ))}
              </CardContent>
            </Card>

            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="border-border/60 bg-card/85 shadow-sm">
                <CardHeader>
                  <CardTitle>Activity visibility</CardTitle>
                  <CardDescription>Show presence and profile signals selectively.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ToggleField label="Show online status" checked={settings.privacy.activityVisibility.onlineStatus} onCheckedChange={() => togglePrivacy("activityVisibility", "onlineStatus")} />
                  <ToggleField label="Show last seen" checked={settings.privacy.activityVisibility.lastSeen} onCheckedChange={() => togglePrivacy("activityVisibility", "lastSeen")} />
                  <ToggleField label="Show profile views" checked={settings.privacy.activityVisibility.profileViews} onCheckedChange={() => togglePrivacy("activityVisibility", "profileViews")} />
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card/85 shadow-sm">
                <CardHeader>
                  <CardTitle>Data permissions</CardTitle>
                  <CardDescription>Limit analytics, recommendations, and partner access.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <ToggleField label="Analytics tracking" checked={settings.privacy.dataPermissions.analyticsTracking} onCheckedChange={() => togglePrivacy("dataPermissions", "analyticsTracking")} />
                  <ToggleField label="Personalized recommendations" checked={settings.privacy.dataPermissions.personalizedRecommendations} onCheckedChange={() => togglePrivacy("dataPermissions", "personalizedRecommendations")} />
                  <ToggleField label="Third-party integrations" checked={settings.privacy.dataPermissions.thirdPartyIntegrations} onCheckedChange={() => togglePrivacy("dataPermissions", "thirdPartyIntegrations")} />
                </CardContent>
              </Card>
            </div>
          </div>
        ) : null}

        {activeSection === "appearance" ? (
          <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
            <Card className="border-border/60 bg-card/85 shadow-sm">
              <CardHeader>
                <CardTitle>Theme and preferences</CardTitle>
                <CardDescription>Switch the theme and interface density.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-3 sm:grid-cols-3">
                  {(["Light", "Dark", "System"] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => toggleAppearance("theme", option)}
                      className={cn(
                        "rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
                        settings.appearance.theme === option ? "border-primary bg-primary/10" : "border-border/60 hover:border-border",
                      )}
                    >
                      <p className="font-medium text-foreground">{option}</p>
                      <p className="text-sm text-muted-foreground">{option} appearance</p>
                    </button>
                  ))}
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <button type="button" onClick={() => toggleAppearance("density", "Compact")} className={cn("rounded-2xl border p-4 text-left", settings.appearance.density === "Compact" ? "border-primary bg-primary/10" : "border-border/60")}>Compact Mode</button>
                  <button type="button" onClick={() => toggleAppearance("density", "Comfortable")} className={cn("rounded-2xl border p-4 text-left", settings.appearance.density === "Comfortable" ? "border-primary bg-primary/10" : "border-border/60")}>Comfortable Mode</button>
                </div>
                <div className="space-y-3">
                  <ToggleField label="Larger text" checked={settings.appearance.largerText} onCheckedChange={() => toggleAppearance("largerText", !settings.appearance.largerText)} />
                  <ToggleField label="Reduced motion" checked={settings.appearance.reducedMotion} onCheckedChange={() => toggleAppearance("reducedMotion", !settings.appearance.reducedMotion)} />
                  <ToggleField label="High contrast mode" checked={settings.appearance.highContrast} onCheckedChange={() => toggleAppearance("highContrast", !settings.appearance.highContrast)} />
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card/85 shadow-sm">
              <CardHeader>
                <CardTitle>Live preview</CardTitle>
                <CardDescription>Preview how the interface will feel with the selected options.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className={cn("rounded-3xl border border-border/60 p-4 transition", settings.appearance.theme === "Dark" ? "bg-slate-950 text-slate-50" : "bg-background") }>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Workspace preview</p>
                      <p className="text-xs opacity-70">Density: {settings.appearance.density}</p>
                    </div>
                    <Badge variant="outline">Theme: {settings.appearance.theme}</Badge>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <PreviewCard title="Header" value="Build for focus, not clutter." />
                    <PreviewCard title="Card" value="Rounded, calm, and readable." />
                  </div>
                </div>
                <Button onClick={() => setFeedback({ type: "success", message: "Appearance preview updated." })}>Apply preview</Button>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {activeSection === "locale" ? (
          <Card className="border-border/60 bg-card/85 shadow-sm">
            <CardHeader>
              <CardTitle>Language & region</CardTitle>
              <CardDescription>Choose localization for text, formatting, and money.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <SelectField label="Language" value={settings.locale.language} onChange={(event) => setSettings((previous) => ({ ...previous, locale: { ...previous.locale, language: event.target.value } }))} options={languageOptions.map((value) => ({ label: value, value }))} />
              <SelectField label="Region" value={settings.locale.region} onChange={(event) => setSettings((previous) => ({ ...previous, locale: { ...previous.locale, region: event.target.value } }))} options={regionOptions.map((value) => ({ label: value, value }))} />
              <SelectField label="Timezone" value={settings.locale.timezone} onChange={(event) => setSettings((previous) => ({ ...previous, locale: { ...previous.locale, timezone: event.target.value } }))} options={timezoneOptions.map((value) => ({ label: value, value }))} />
              <SelectField label="Date format" value={settings.locale.dateFormat} onChange={(event) => setSettings((previous) => ({ ...previous, locale: { ...previous.locale, dateFormat: event.target.value } }))} options={dateFormatOptions.map((value) => ({ label: value, value }))} />
              <SelectField label="Currency" value={settings.locale.currency} onChange={(event) => setSettings((previous) => ({ ...previous, locale: { ...previous.locale, currency: event.target.value } }))} options={currencyOptions.map((value) => ({ label: value, value }))} />
              <div className="flex items-end">
                <Button onClick={saveLocale}>Save locale preferences</Button>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {activeSection === "billing" ? (
          <div className="space-y-4">
            <div className="grid gap-4 lg:grid-cols-2">
              <Card className="border-border/60 bg-card/85 shadow-sm">
                <CardHeader>
                  <CardTitle>Current plan</CardTitle>
                  <CardDescription>Plan summary and subscription controls.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <PreviewCard title="Plan name" value={settings.billing.planName} />
                  <PreviewCard title="Renewal date" value={settings.billing.renewalDate} />
                  <PreviewCard title="Billing cycle" value={settings.billing.billingCycle} />
                  <PreviewCard title="Status" value={settings.billing.status} />
                  <div className="flex flex-wrap gap-3 pt-2">
                    <Button>Upgrade plan</Button>
                    <Button variant="outline">Cancel subscription</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card/85 shadow-sm">
                <CardHeader>
                  <CardTitle>Payment methods</CardTitle>
                  <CardDescription>Saved cards and billing payment tools.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {settings.billing.paymentMethods.map((method) => (
                    <div key={method.id} className="rounded-2xl border border-border/60 p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="font-medium text-foreground">{method.cardType} •••• {method.lastFour}</p>
                          <p className="text-sm text-muted-foreground">{method.label} · Expires {method.expiresAt}</p>
                        </div>
                        {method.isDefault ? <Badge>Default</Badge> : null}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline">Add payment method</Button>
                </CardContent>
              </Card>
            </div>

            <Card className="border-border/60 bg-card/85 shadow-sm">
              <CardHeader>
                <CardTitle>Billing history</CardTitle>
                <CardDescription>Recent invoices with download actions.</CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full min-w-180 text-sm">
                  <thead className="text-left text-muted-foreground">
                    <tr className="border-b border-border/60">
                      <th className="pb-3 font-medium">Invoice ID</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Amount</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium">Download</th>
                    </tr>
                  </thead>
                  <tbody>
                    {settings.billing.history.map((item) => (
                      <tr key={item.invoiceId} className="border-b border-border/40">
                        <td className="py-3 font-medium text-foreground">{item.invoiceId}</td>
                        <td className="py-3 text-muted-foreground">{item.date}</td>
                        <td className="py-3 text-muted-foreground">{item.amount}</td>
                        <td className="py-3">
                          <Badge variant={item.status === "Failed" ? "destructive" : "outline"}>{item.status}</Badge>
                        </td>
                        <td className="py-3">
                          <Button variant="ghost" size="sm" className="gap-2">
                            <DownloadIcon className="size-4" />
                            Download invoice
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {activeSection === "connected" ? (
          <Card className="border-border/60 bg-card/85 shadow-sm">
            <CardHeader>
              <CardTitle>Connected accounts</CardTitle>
              <CardDescription>Manage social logins and third-party integrations.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {settings.connected.map((account) => (
                <div key={account.id} className="rounded-2xl border border-border/60 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{account.name}</p>
                      <p className="text-sm text-muted-foreground">{account.kind === "social" ? "Social login" : "Integration"}</p>
                    </div>
                    <Badge variant={account.status === "Connected" ? "default" : account.status === "Needs Attention" ? "destructive" : "outline"}>
                      {account.status}
                    </Badge>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm">Connect</Button>
                    <Button variant="ghost" size="sm">Disconnect</Button>
                    <Button variant="ghost" size="sm">Reconnect</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : null}

        {activeSection === "apiKeys" ? (
          <Card className="border-border/60 bg-card/85 shadow-sm">
            <CardHeader>
              <CardTitle>API keys</CardTitle>
              <CardDescription>Generate scoped keys and only show secrets once.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 overflow-x-auto">
              <div className="flex flex-wrap gap-3">
                <Button onClick={() => setCreateKeyOpen(true)} className="gap-2">
                  <PlusIcon className="size-4" />
                  Create key
                </Button>
                <Button variant="outline">Rotate key</Button>
              </div>
              <table className="w-full min-w-190 text-sm">
                <thead className="text-left text-muted-foreground">
                  <tr className="border-b border-border/60">
                    <th className="pb-3 font-medium">Key name</th>
                    <th className="pb-3 font-medium">Created date</th>
                    <th className="pb-3 font-medium">Last used</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Secret</th>
                    <th className="pb-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {apiKeys.map((key) => (
                    <tr key={key.id} className="border-b border-border/40">
                      <td className="py-3 font-medium text-foreground">{key.name}</td>
                      <td className="py-3 text-muted-foreground">{key.createdAt}</td>
                      <td className="py-3 text-muted-foreground">{key.lastUsed}</td>
                      <td className="py-3">
                        <Badge variant={key.status === "Active" ? "default" : "destructive"}>{key.status}</Badge>
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-2">
                          <code className="rounded-lg bg-muted px-2 py-1 text-xs">
                            {showSecret[key.id] ? key.preview : "••••••••••••••"}
                          </code>
                          <Button variant="ghost" size="icon-sm" onClick={() => setShowSecret((previous) => ({ ...previous, [key.id]: !previous[key.id] }))}>
                            <EyeIcon className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon-sm" onClick={() => void handleCopy(key.preview)}>
                            <CopyIcon className="size-4" />
                          </Button>
                        </div>
                      </td>
                      <td className="py-3">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" className="gap-2" onClick={() => setRevokeOpen(key.id)}>
                            <Trash2Icon className="size-4" />
                            Revoke
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <RefreshCwIcon className="size-4" />
                            Regenerate
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        ) : null}

        {activeSection === "storage" ? (
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="border-border/60 bg-card/85 shadow-sm">
              <CardHeader>
                <CardTitle>Storage usage</CardTitle>
                <CardDescription>Current storage footprint and remaining quota.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-2xl border border-border/60 p-4">
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span>Used storage</span>
                    <span>{settings.storage.used} GB / {settings.storage.total} GB</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-muted">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${settings.storage.used}%` }} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{settings.storage.remaining} GB remaining</p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Button>Export data</Button>
                  <Button variant="outline">Download archive</Button>
                  <Button variant="outline">Request data report</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-card/85 shadow-sm">
              <CardHeader>
                <CardTitle>Account cleanup</CardTitle>
                <CardDescription>Remove cached and uploaded data when it is no longer needed.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="justify-start">Delete uploaded files</Button>
                <Button variant="outline" className="justify-start">Clear cache</Button>
                <Button variant="outline" className="justify-start">Remove archived data</Button>
              </CardContent>
            </Card>
          </div>
        ) : null}

        {activeSection === "support" ? (
          <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
            <Card className="border-border/60 bg-card/85 shadow-sm">
              <CardHeader>
                <CardTitle>Support options</CardTitle>
                <CardDescription>Choose how to reach the support team.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-between">Contact support <ArrowRightIcon className="size-4" /></Button>
                <Button variant="outline" className="w-full justify-between">Submit ticket <ArrowRightIcon className="size-4" /></Button>
                <Button variant="outline" className="w-full justify-between">Live chat <ArrowRightIcon className="size-4" /></Button>
              </CardContent>
            </Card>

            <div className="space-y-4">
              <Card className="border-border/60 bg-card/85 shadow-sm">
                <CardHeader>
                  <CardTitle>Resources</CardTitle>
                  <CardDescription>Find answers in docs, FAQs, and the community.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3 sm:grid-cols-3">
                  <Button variant="outline" className="justify-start gap-2"><ExternalLinkIcon className="size-4" /> Documentation</Button>
                  <Button variant="outline" className="justify-start gap-2"><ExternalLinkIcon className="size-4" /> FAQs</Button>
                  <Button variant="outline" className="justify-start gap-2"><ExternalLinkIcon className="size-4" /> Community forum</Button>
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card/85 shadow-sm">
                <CardHeader>
                  <CardTitle>Feedback</CardTitle>
                  <CardDescription>Share feature requests, bugs, or general feedback.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <TextField label="Subject" placeholder="Feature request" />
                  <TextAreaField label="Message" rows={4} placeholder="Tell us what you need." />
                  <div className="flex flex-wrap gap-3">
                    <Button>Submit feedback</Button>
                    <Button variant="outline">Report a bug</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/60 bg-card/85 shadow-sm">
                <CardHeader>
                  <CardTitle>Open requests</CardTitle>
                  <CardDescription>A simple empty state for support tracking.</CardDescription>
                </CardHeader>
                <CardContent>
                  <EmptyState
                    title="No open tickets"
                    description="Your support queue is clear. New requests will appear here."
                    actionLabel="Start a ticket"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        ) : null}

        <DeleteAccountDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          register={deleteForm.register}
          error={deleteForm.formState.errors.password?.message}
          busy={deleteMutation.isPending}
          onConfirm={deleteForm.handleSubmit(() => deleteMutation.mutate())}
        />

        <ConfirmationModal
          open={revokeOpen !== null}
          onOpenChange={(open) => !open && setRevokeOpen(null)}
          title="Revoke API key"
          description="This key will stop working immediately. This action cannot be undone."
          confirmLabel="Revoke key"
          busy={false}
          onConfirm={() => revokeOpen && handleRevokeApiKey(revokeOpen)}
        >
          <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
            Confirm that you want to revoke this key before proceeding.
          </div>
        </ConfirmationModal>

        <ConfirmationModal
          open={createKeyOpen}
          onOpenChange={setCreateKeyOpen}
          title="Create API key"
          description="The new key will be shown only once and should be copied immediately."
          confirmLabel="Create key"
          busy={createKeyMutation.isPending}
          onConfirm={() => void createKeyMutation.mutateAsync(newKeyName)}
        >
          <div className="space-y-3">
            <TextField label="Key name" value={newKeyName} onChange={(event) => setNewKeyName(event.target.value)} placeholder="Production API" />
            <div className="rounded-2xl border border-border/60 bg-muted/30 p-3 text-sm text-muted-foreground">
              The secret value will be displayed only once after creation.
            </div>
          </div>
        </ConfirmationModal>
      </div>
    </SettingsLayout>
  );
}

function EmptyState({ title, description, actionLabel }: { title: string; description: string; actionLabel: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border/70 bg-muted/30 p-6 text-center">
      <ShieldAlertIcon className="mx-auto size-8 text-muted-foreground" />
      <p className="mt-3 text-sm font-medium text-foreground">{title}</p>
      <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      <Button variant="outline" className="mt-4">{actionLabel}</Button>
    </div>
  );
}

function DeleteAccountDialog({
  open,
  onOpenChange,
  register,
  error,
  busy,
  onConfirm,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  register: UseFormRegister<DeleteFormValues>;
  error?: string;
  busy: boolean;
  onConfirm: () => void;
}) {
  return (
    <ConfirmationModal
      open={open}
      onOpenChange={onOpenChange}
      title="Delete account"
      description="Type your password to confirm the deletion request."
      confirmLabel="Delete account"
      busy={busy}
      onConfirm={onConfirm}
    >
      <div className="space-y-3">
        <div className="rounded-2xl border border-destructive/20 bg-destructive/10 p-3 text-sm text-destructive">
          This action will permanently remove your account and associated data.
        </div>
        <TextField label="Password" type="password" required {...register("password")} error={error} />
      </div>
    </ConfirmationModal>
  );
}

