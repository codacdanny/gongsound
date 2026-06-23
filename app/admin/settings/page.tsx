"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import toast from "react-hot-toast";

interface Settings {
  id: number;
  backgroundMusicUrl: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    backgroundMusicUrl: "/ambient.mp3",
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/settings");
      if (res.ok) {
        const data = await res.json();
        setSettings(data);
        setFormData({ backgroundMusicUrl: data.backgroundMusicUrl });
      }
    } catch (error) {
      console.error("Failed to fetch settings", error);
      toast.error("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.backgroundMusicUrl.trim()) {
      toast.error("Please enter a music URL");
      return;
    }

    try {
      setIsSaving(true);
      const res = await fetch("/api/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setSettings(data);
        toast.success("Background music updated!");
      } else {
        toast.error("Failed to update settings");
      }
    } catch (error) {
      console.error("Failed to save settings", error);
      toast.error("Error saving settings");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-bg pt-8 pb-20 px-5 sm:px-8">
        <div className="mx-auto max-w-[1200px]">
          <p className="text-ivory/60">Loading settings...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg pt-8 pb-20 px-5 sm:px-8">
      <div className="mx-auto max-w-[1200px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-12">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-sm text-gold/70 hover:text-gold self-start sm:self-auto"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Back
          </Link>
          <h1 className="display text-3xl sm:text-3xl text-ivory">Settings</h1>
        </div>

        {/* Background Music Settings */}
        <div className="max-w-2xl">
          <div className="rounded-2xl border border-gold/30 bg-bg-raise/50 p-6 sm:p-8">
            <h2 className="text-xl font-bold text-ivory mb-6">
              Background Music
            </h2>
            <p className="text-ivory/70 text-sm mb-6">
              Set the background ambient music URL. This audio will loop
              continuously on the website. Visitors can mute/unmute with the
              button in the corner.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-ivory mb-3">
                  Music File URL
                </label>
                <input
                  type="text"
                  placeholder="/ambient.mp3 or https://..."
                  value={formData.backgroundMusicUrl}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      backgroundMusicUrl: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gold/30 bg-bg/50 px-4 py-3.5 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60 text-sm sm:text-base"
                />
                <p className="text-xs text-ivory/50 mt-2">
                  Relative path (e.g., /ambient.mp3) or absolute URL
                  (e.g., https://example.com/music.mp3)
                </p>
              </div>

              {/* Current Music Preview */}
              {settings && (
                <div>
                  <p className="text-sm text-ivory/60 mb-3">
                    Current Music URL:
                  </p>
                  <div className="p-3 rounded-lg bg-bg/50 border border-gold/20">
                    <code className="text-xs text-gold break-all">
                      {settings.backgroundMusicUrl}
                    </code>
                  </div>
                </div>
              )}

              {/* Audio Preview */}
              <div>
                <p className="text-sm text-ivory/60 mb-3">Preview:</p>
                <audio
                  controls
                  src={formData.backgroundMusicUrl}
                  className="w-full rounded-lg"
                  style={{ outline: "1px solid rgba(230,184,76,0.3)" }}
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-lg bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bg transition-opacity disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
                <button
                  type="button"
                  onClick={() => fetchSettings()}
                  className="rounded-lg border border-gold/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold transition-colors hover:bg-gold/10"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          {/* Info Section */}
          <div className="mt-8 p-6 rounded-lg border border-gold/20 bg-bg-raise/30">
            <h3 className="font-bold text-ivory mb-3">How to use:</h3>
            <ul className="text-sm text-ivory/70 space-y-2">
              <li>
                ✓ Upload your music file to the{" "}
                <code className="text-gold">/public</code> folder and use the
                path (e.g., /music.mp3)
              </li>
              <li>
                ✓ Or provide a full URL to an external music file (must support
                CORS)
              </li>
              <li>
                ✓ Use MP3 or other common audio formats for best compatibility
              </li>
              <li>
                ✓ The music will loop continuously and visitors can control
                volume
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}
