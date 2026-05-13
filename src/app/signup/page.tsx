import Link from "next/link";
import LeftBrand from "@/components/login/LeftBrand";
import SignupForm from "@/components/login/SignupForm";

export const metadata = {
  title: "Sign Up — Social Hub",
};

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-900 via-neutral-900 to-black text-white">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[80vh] py-12">
          <div className="hidden lg:col-span-7 lg:flex">
            <LeftBrand />
          </div>

          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="w-full max-w-md">
              <SignupForm />
              <p className="mt-6 text-center text-sm text-zinc-400">
                Already have an account?{' '}
                <Link href="/login" className="font-semibold text-white underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
