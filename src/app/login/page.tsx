import Link from "next/link";
import LeftBrand from "@/components/login/LeftBrand";
import LoginForm from "@/components/login/LoginForm";
import { MoveLeft } from "lucide-react";

export const metadata = {
  title: "Login — Social Hub",
};

export default function LoginPage() {
  return (
    <main className="relative min-h-screen bg-linear-to-br from-zinc-900 via-neutral-900 to-black text-white">
      <Link
        href="/"
        className="absolute left-6 top-6 z-20 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white/90 backdrop-blur-sm transition hover:bg-white/10"
      >
        <MoveLeft size={18} />
        Back
      </Link>

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh] py-12">
          <div className="hidden lg:col-span-7 lg:flex">
            <LeftBrand />
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-md">
              <LoginForm />
              <p className="mt-6 text-center text-sm text-zinc-400">
                New here?{' '}
                <Link href="/signup" className="font-semibold text-white underline">
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
