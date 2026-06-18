"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error || "Invalid credentials");
      } else {
        router.push("/admin/dashboard");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-bg flex items-center justify-center px-5">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h1 className="display text-4xl text-ivory mb-2">Admin Login</h1>
          <p className="text-ivory/60">Manage Gongsound Entertainment</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-gold/30 bg-bg-raise/50 p-8 space-y-6"
        >
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 text-red-200 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-ivory mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              className="w-full rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60"
              placeholder="admin@gongsound.com"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-ivory mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                className="w-full rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 pr-12 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-ivory/60 hover:text-ivory transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" aria-hidden />
                ) : (
                  <Eye className="h-5 w-5" aria-hidden />
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-gold px-6 py-3 text-base font-semibold uppercase tracking-[0.14em] text-bg transition-opacity disabled:opacity-50"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="text-center text-sm text-ivory/50 mt-8">
          Need admin access? Contact the team.
        </p>
      </div>
    </main>
  );
}
