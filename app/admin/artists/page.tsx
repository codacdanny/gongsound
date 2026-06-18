"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Edit2 } from "lucide-react";
import toast from "react-hot-toast";

interface Artist {
  id: number;
  name: string;
  role?: string;
  bio?: string;
  image?: string;
}

export default function ArtistsAdminPage() {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    bio: "",
    image: "",
  });

  useEffect(() => {
    fetchArtists();
  }, []);

  const fetchArtists = async () => {
    try {
      const res = await fetch("/api/artists");
      if (res.ok) {
        setArtists(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch artists", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/artists/${editingId}` : "/api/artists";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingId ? "Artist updated!" : "Artist added!");
        setFormData({
          name: "",
          role: "",
          bio: "",
          image: "",
        });
        setEditingId(null);
        setShowForm(false);
        fetchArtists();
      }
    } catch (error) {
      console.error("Failed to save artist", error);
      toast.error("Failed to save artist");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this artist?")) return;

    try {
      const res = await fetch(`/api/artists/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Artist deleted!");
        fetchArtists();
      }
    } catch (error) {
      console.error("Failed to delete artist", error);
      toast.error("Failed to delete artist");
    }
  };

  const handleEdit = (artist: Artist) => {
    setFormData({
      name: artist.name,
      role: artist.role || "",
      bio: artist.bio || "",
      image: artist.image || "",
    });
    setEditingId(artist.id);
    setShowForm(true);
  };

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
          <h1 className="display text-3xl text-ivory">Artists Roster</h1>
        </div>

        {/* Add button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-8 rounded-lg bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bg"
          >
            + Add Artist
          </button>
        )}

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-12 rounded-2xl border border-gold/30 bg-bg-raise/50 p-8 space-y-6"
          >
            <h3 className="text-xl font-bold text-ivory">
              {editingId ? "Edit Artist" : "New Artist"}
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                placeholder="Artist Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60"
              />
              <input
                type="text"
                placeholder="Role (e.g., Singer, Producer)"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60"
              />
              <input
                type="url"
                placeholder="Image URL (optional)"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60 md:col-span-2"
              />
            </div>

            <textarea
              placeholder="Artist Bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60 min-h-24"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded-lg bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bg"
              >
                {editingId ? "Update Artist" : "Add Artist"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    name: "",
                    role: "",
                    bio: "",
                    image: "",
                  });
                }}
                className="rounded-lg border border-gold/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Artists list */}
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-ivory/60">Loading artists...</p>
          ) : artists.length === 0 ? (
            <p className="text-ivory/60">No artists yet. Add your first artist!</p>
          ) : (
            artists.map((artist) => (
              <div
                key={artist.id}
                className="rounded-lg border border-gold/30 bg-bg-raise/50 p-6 flex items-center justify-between"
              >
                <div>
                  <h3 className="font-bold text-ivory">{artist.name}</h3>
                  {artist.role && (
                    <p className="text-sm text-gold">{artist.role}</p>
                  )}
                  {artist.bio && (
                    <p className="text-sm text-ivory/60 line-clamp-2 mt-2">
                      {artist.bio}
                    </p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(artist)}
                    className="p-2 rounded-lg border border-gold/50 text-gold hover:bg-gold/10"
                  >
                    <Edit2 className="h-4 w-4" aria-hidden />
                  </button>
                  <button
                    onClick={() => handleDelete(artist.id)}
                    className="p-2 rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
