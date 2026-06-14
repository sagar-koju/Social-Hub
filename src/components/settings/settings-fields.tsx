"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon, Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type FieldProps = {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
};

export function FormField({ label, hint, error, required, children }: FieldProps) {
  return (
    <div className="space-y-2">
      <div className="space-y-1">
        <label className="text-sm font-medium text-foreground">
          {label}
          {required ? <span className="ml-1 text-destructive">*</span> : null}
        </label>
        {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
      </div>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

type InputFieldProps = React.ComponentProps<typeof Input> & FieldProps;

export function TextField({ label, hint, error, required, ...props }: InputFieldProps) {
  return (
    <FormField label={label} hint={hint} error={error} required={required}>
      <Input aria-invalid={Boolean(error)} {...props} />
    </FormField>
  );
}

type TextareaFieldProps = React.ComponentProps<typeof Textarea> & FieldProps;

export function TextAreaField({ label, hint, error, required, ...props }: TextareaFieldProps) {
  return (
    <FormField label={label} hint={hint} error={error} required={required}>
      <Textarea aria-invalid={Boolean(error)} {...props} />
    </FormField>
  );
}

type ToggleFieldProps = {
  label: string;
  description?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
};

export function ToggleField({
  label,
  description,
  checked,
  onCheckedChange,
  disabled,
}: ToggleFieldProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onCheckedChange(!checked)}
      className={cn(
        "flex w-full items-center justify-between gap-4 rounded-xl border border-border/60 bg-background px-4 py-3 text-left transition hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-60",
      )}
    >
      <span className="space-y-1">
        <span className="block text-sm font-medium text-foreground">{label}</span>
        {description ? <span className="block text-xs text-muted-foreground">{description}</span> : null}
      </span>
      <span
        className={cn(
          "flex h-6 w-11 items-center rounded-full border px-0.5 transition",
          checked ? "border-primary bg-primary/20" : "border-border bg-muted",
        )}
      >
        <span
          className={cn(
            "size-5 rounded-full bg-background shadow-sm transition",
            checked ? "translate-x-5" : "translate-x-0",
          )}
        />
      </span>
    </button>
  );
}

type SelectFieldProps = FieldProps &
  React.SelectHTMLAttributes<HTMLSelectElement> & {
    options: Array<{ label: string; value: string }>;
  };

export function SelectField({ label, hint, error, required, options, ...props }: SelectFieldProps) {
  return (
    <FormField label={label} hint={hint} error={error} required={required}>
      <div className="relative">
        <select
          aria-invalid={Boolean(error)}
          className={cn(
            "h-9 w-full appearance-none rounded-lg border border-input bg-background px-3 pr-9 text-sm outline-none transition focus-visible:ring-2 focus-visible:ring-ring/60 disabled:cursor-not-allowed disabled:opacity-60",
          )}
          {...props}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDownIcon className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
      </div>
    </FormField>
  );
}

type LoadingButtonProps = React.ComponentProps<typeof Button> & {
  loading?: boolean;
};

export function LoadingButton({ loading, children, disabled, ...props }: LoadingButtonProps) {
  return (
    <Button disabled={loading || disabled} {...props}>
      {loading ? <Loader2Icon className="size-4 animate-spin" /> : null}
      {children}
    </Button>
  );
}

export function PreviewCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card p-3 shadow-sm">
      <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{title}</p>
      <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
    </div>
  );
}

export function SuccessMark() {
  return <CheckIcon className="size-4 text-emerald-500" />;
}
