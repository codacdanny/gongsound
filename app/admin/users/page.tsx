import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function UsersAdminPage() {
  return (
    <main className="min-h-screen bg-bg pt-8 pb-20 px-5 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="flex items-center gap-4 mb-12">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gold/70 hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </Link>
          <h1 className="display text-3xl text-ivory">Admin Users</h1>
        </div>

        <div className="rounded-2xl border border-gold/30 bg-bg-raise/50 p-8 text-center">
          <p className="text-gold mb-4">Coming Soon</p>
          <p className="text-ivory/60">
            User management will be available after initial setup. For now, add
            admin users directly in the database.
          </p>
        </div>
      </div>
    </main>
  );
}
