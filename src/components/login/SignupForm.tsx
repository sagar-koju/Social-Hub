"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import { AxiosError } from "axios";
import PasswordInput from "@/components/login/PasswordInput";
import SocialButton from "@/components/login/SocialButton";
import { useSignup } from "@/hooks/useSignup";
import { toast } from "react-hot-toast";


export default function SignupForm() {
  const router = useRouter();
  const signupMutation = useSignup();
  const [name, setName] = useState("");
  const [userName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage("");

    signupMutation.mutate(
      {
        username: userName,
        email,
        password,
        displayName: name,
      },
      {
        onSuccess: () => {
          toast.success("Account created successfully! Welcome to Social Hub.");
          router.push("/login");
        },
        onError: (error) => {
          console.error("Registration failed:", error);

          const axiosError = error as AxiosError<{
            message?: string;
            error?: string;
          }>;

          const apiMessage =
            axiosError.response?.data?.message ||
            axiosError.response?.data?.error ||
            "Registration failed. Please try again.";

          setErrorMessage(apiMessage);
          toast.error(apiMessage);
        },
      },
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-linear-to-br from-white to-white dark:from-white/3 dark:to-white/5 rounded-2xl p-6 border border-white/6 backdrop-blur-md shadow-lg"
    >
      <div className="mb-4">
        <h2 className="text-2xl font-bold">Create account</h2>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">Join Social Hub and start connecting</p>
      </div>

      <form className="space-y-4" onSubmit={onSubmit}>
        <label className="block text-sm">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 dark:text-zinc-300"><User size={16} /></span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              required
              className="w-full rounded-xl bg-black/5 dark:bg-white/3 border border-black/20 dark:border-white/6 px-10 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition placeholder:text-zinc-500 text-zinc-600 dark:text-white"
            />
          </div>
        </label>

         <label className="block text-sm">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 dark:text-zinc-300"><User size={16} /></span>
            <input
              value={userName}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
              className="w-full rounded-xl bg-black/5 dark:bg-white/3 border border-black/20 dark:border-white/6 px-10 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition  placeholder:text-zinc-500 text-zinc-600 dark:text-white"
            />
          </div>
        </label>

        <label className="block text-sm">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 dark:text-zinc-300"><Mail size={16} /></span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              required
              className="w-full rounded-xl bg-black/5 dark:bg-white/3 border border-black/20 dark:border-white/6 px-10 py-3 outline-none focus:ring-2 focus:ring-indigo-500 transition placeholder:text-zinc-500 text-zinc-600 dark:text-white"
            />
          </div>
        </label>

        {errorMessage ? (
          <p className="text-xs px-2 text-red-300" role="alert" aria-live="polite">
            {errorMessage}
          </p>
        ) : null}

        <label className="block text-sm">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600 dark:text-zinc-300"><Lock size={16} /></span>
            <PasswordInput value={password} onChange={setPassword} placeholder="Password" />
          </div>
        </label>

        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={agreeToTerms}
            onChange={(e) => setAgreeToTerms(e.target.checked)}
            required
            className="w-4 h-4 rounded-sm bg-white/5 border-white/6 mt-1"
          />
          <span className="text-zinc-600 dark:text-zinc-300">
            I agree to the{' '}
            <a href="#" className="text-indigo-500 hover:underline">
              Terms of Service
            </a>
            {' '}and{' '}
            <a href="#" className="text-indigo-500 hover:underline">
              Privacy Policy
            </a>
          </span>
        </label>

        <button
          type="submit"
          disabled={signupMutation.isPending || !agreeToTerms}
          className="w-full rounded-xl py-3 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 hover:scale-[1.01] transform transition text-white font-semibold shadow-md disabled:opacity-60"
        >
          {signupMutation.isPending ? 'Creating account…' : 'Create account'}
        </button>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-black/6 dark:bg-white/6" />
          <div className="text-xs text-zinc-600 dark:text-zinc-500">OR</div>
          <div className="flex-1 h-px bg-black/6 dark:bg-white/6" />
        </div>

        <div className="grid grid-cols-1 gap-3">
          <SocialButton>
            <svg width="16" height="16" viewBox="0 0 48 48" className="opacity-95"><path fill="currentColor" d="M44.5 20H24v8.9h11.9C34.9 33.9 30 38 24 38c-7.7 0-14-6.3-14-14s6.3-14 14-14c3.8 0 7.3 1.4 9.9 3.7l6.7-6.7C37.1 3.9 30.8 1 24 1 11.3 1 1 11.3 1 24s10.3 23 23 23 23-10.3 23-23c0-1.6-.2-3.1-.5-4.5z"/></svg>
            Sign up with Google
          </SocialButton>

          <SocialButton>
            <svg width="16" height="16" viewBox="0 0 24 24" className="opacity-95"><path fill="currentColor" d="M12 .5C5.7.5.9 5.3.9 11.6c0 4.7 3 8.8 7.2 10.2.5.1.7-.2.7-.5v-1.9c-2.9.6-3.5-1.4-3.5-1.4-.5-1.2-1.3-1.5-1.3-1.5-1-.7.1-.7.1-.7 1.1.1 1.6 1.1 1.6 1.1 1 .1.9 1.8.9 1.8.2 1.8 2 1.3 2.5 1 .1-.8.4-1.3.7-1.6-2.3-.3-4.7-1.2-4.7-5.3 0-1.2.4-2.2 1-3-.1-.3-.5-1.5.1-3.1 0 0 .8-.2 2.8 1 .8-.2 1.7-.3 2.5-.3s1.7.1 2.5.3c2-.1 2.8-1 2.8-1 .6 1.6.2 2.8.1 3.1.6.8 1 1.8 1 3 0 4.1-2.4 5-4.7 5.3.4.3.8 1 .8 2v3c0 .3.2.6.7.5 4.2-1.4 7.2-5.5 7.2-10.2C23.1 5.3 18.3.5 12 .5z"/></svg>
            Sign up with GitHub
          </SocialButton>
        </div>

      </form>

    </motion.div>
  );
}
