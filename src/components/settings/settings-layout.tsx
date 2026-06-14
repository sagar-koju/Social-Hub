"use client";

import * as React from "react";
import { MenuIcon, SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { settingsSections } from "./settings-data";
import type { SettingsSectionId } from "./settings-types";

type SettingsLayoutProps = {
  activeSection: SettingsSectionId;
  onSectionChange: (section: SettingsSectionId) => void;
  sidebarFooter?: React.ReactNode;
  children: React.ReactNode;
  title: string;
  description: string;
  status?: React.ReactNode;
};

export function SettingsLayout({
  activeSection,
  onSectionChange,
  sidebarFooter,
  children,
  title,
  description,
  status,
}: SettingsLayoutProps) {
  const active = settingsSections.find((section) => section.id === activeSection) ?? settingsSections[0];

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.7),_transparent_38%),linear-gradient(180deg,rgba(255,255,255,0.2),transparent_18%)] px-4 py-4 sm:px-6 lg:px-8 dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.04),_transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_18%)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4">
        <header className="rounded-3xl border border-border/60 bg-card/85 p-4 shadow-sm backdrop-blur md:p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <p className="text-xs font-medium uppercase tracking-[0.35em] text-muted-foreground">Settings</p>
              <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h1>
                <p className="max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">{description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">{status}</div>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-[18rem_minmax(0,1fr)]">
          <aside className="hidden lg:block">
            <div className="sticky top-4 rounded-3xl border border-border/60 bg-card/85 p-3 shadow-sm backdrop-blur">
              <div className="mb-3 flex items-center justify-between px-2 pt-1">
                <div>
                  <p className="text-sm font-medium text-foreground">Navigation</p>
                  <p className="text-xs text-muted-foreground">{active.title}</p>
                </div>
                <SearchIcon className="size-4 text-muted-foreground" />
              </div>
              <ScrollArea className="h-[calc(100vh-15rem)] pr-1">
                <SettingsSidebarContent activeSection={activeSection} onSectionChange={onSectionChange} />
                {sidebarFooter ? <div className="mt-4 px-2">{sidebarFooter}</div> : null}
              </ScrollArea>
            </div>
          </aside>

          <div className="lg:hidden">
            <Sheet>
              <div className="flex items-center justify-between rounded-3xl border border-border/60 bg-card/85 p-3 shadow-sm backdrop-blur">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">{active.title}</p>
                  <p className="text-sm text-muted-foreground">Use the menu to switch settings categories.</p>
                </div>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-2">
                    <MenuIcon className="size-4" />
                    Menu
                  </Button>
                </SheetTrigger>
              </div>
              <SheetContent side="left" className="w-[min(88vw,20rem)] px-0">
                <SheetHeader className="border-b border-border/60 px-4 pb-4">
                  <SheetTitle>Settings</SheetTitle>
                </SheetHeader>
                <div className="px-3 py-4">
                  <SettingsSidebarContent activeSection={activeSection} onSectionChange={onSectionChange} />
                  {sidebarFooter ? <div className="mt-4 px-2">{sidebarFooter}</div> : null}
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <section className="min-w-0">{children}</section>
        </div>
      </div>
    </main>
  );
}

type SidebarContentProps = {
  activeSection: SettingsSectionId;
  onSectionChange: (section: SettingsSectionId) => void;
};

export function SettingsSidebarContent({ activeSection, onSectionChange }: SidebarContentProps) {
  return (
    <nav aria-label="Settings sections" className="space-y-1">
      {settingsSections.map((section) => {
        const isActive = section.id === activeSection;

        return (
          <button
            key={section.id}
            type="button"
            onClick={() => onSectionChange(section.id)}
            className={cn(
              "flex w-full items-start gap-3 rounded-2xl px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60",
              isActive ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
            )}
          >
            <span className={cn("mt-0.5 size-2 rounded-full", isActive ? "bg-primary" : "bg-border")} />
            <span className="space-y-1">
              <span className="block text-sm font-medium">{section.title}</span>
              <span className="block text-xs leading-5 text-inherit/80">{section.description}</span>
            </span>
          </button>
        );
      })}
    </nav>
  );
}
