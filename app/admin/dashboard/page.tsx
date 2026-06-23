import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LogOut } from "lucide-react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen bg-bg pt-8 pb-20 px-5 sm:px-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-6 mb-12">
          <div>
            <h1 className="display text-3xl sm:text-5xl text-ivory">Admin Dashboard</h1>
            <p className="text-ivory/60 text-sm sm:text-base mt-2">Welcome back, {session?.user?.name || session?.user?.email}</p>
          </div>
          <form action="/api/auth/signout" method="POST" className="w-full sm:w-auto">
            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-lg border border-gold/50 px-5 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold transition-all hover:bg-gold/10"
            >
              <LogOut className="h-4 w-4" aria-hidden />
              Sign out
            </button>
          </form>
        </div>

        {/* Management sections grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Tours & Events",
              description: "Create and manage tour dates and events",
              icon: "🎪",
              href: "/admin/tours",
            },
            {
              title: "News & Articles",
              description: "Post news updates and articles",
              icon: "📰",
              href: "/admin/news",
            },
            {
              title: "Artists",
              description: "Manage the artist roster",
              icon: "🎤",
              href: "/admin/artists",
            },
            {
              title: "Featured Album",
              description: "Update album information",
              icon: "💿",
              href: "/admin/album",
            },
            {
              title: "Users",
              description: "Manage admin user accounts",
              icon: "👥",
              href: "/admin/users",
            },
            {
              title: "Settings",
              description: "Configure background music and site settings",
              icon: "⚙️",
              href: "/admin/settings",
            },
          ].map((section) => (
            <Link
              key={section.href}
              href={section.href}
              className="group rounded-2xl border border-gold/30 bg-bg-raise/50 p-8 transition-all hover:border-gold/60 hover:bg-bg-raise/70"
            >
              <div className="text-4xl mb-4">{section.icon}</div>
              <h3 className="font-display text-2xl text-ivory mb-2 group-hover:text-gold transition-colors">
                {section.title}
              </h3>
              <p className="text-ivory/60">{section.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
