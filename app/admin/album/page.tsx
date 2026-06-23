"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Edit2 } from "lucide-react";
import toast from "react-hot-toast";

interface Album {
  id: number;
  title: string;
  description: string;
  image?: string;
  artists: string;
  releaseDate?: string;
  streamingUrl?: string;
}

export default function AlbumAdminPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    artists: "",
    releaseDate: "",
    streamingUrl: "",
  });

  useEffect(() => {
    fetchAlbums();
  }, []);

  const fetchAlbums = async () => {
    try {
      const res = await fetch("/api/albums");
      if (res.ok) {
        setAlbums(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch albums", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/albums/${editingId}` : "/api/albums";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingId ? "Album updated!" : "Album created!");
        setFormData({
          title: "",
          description: "",
          image: "",
          artists: "",
          releaseDate: "",
          streamingUrl: "",
        });
        setEditingId(null);
        setShowForm(false);
        fetchAlbums();
      }
    } catch (error) {
      console.error("Failed to save album", error);
      toast.error("Failed to save album");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this album?")) return;

    try {
      const res = await fetch(`/api/albums/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Album deleted!");
        fetchAlbums();
      }
    } catch (error) {
      console.error("Failed to delete album", error);
      toast.error("Failed to delete album");
    }
  };

  const handleEdit = (album: Album) => {
    setFormData({
      title: album.title,
      description: album.description,
      image: album.image || "",
      artists: album.artists,
      releaseDate: album.releaseDate || "",
      streamingUrl: album.streamingUrl || "",
    });
    setEditingId(album.id);
    setShowForm(true);
  };

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
          <h1 className="display text-3xl sm:text-3xl text-ivory">Featured Album</h1>
        </div>

        {/* Add button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-8 rounded-lg bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bg"
          >
            + Add Album
          </button>
        )}

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-12 rounded-2xl border border-gold/30 bg-bg-raise/50 p-6 sm:p-8 space-y-6"
          >
            <h3 className="text-xl font-bold text-ivory">
              {editingId ? "Edit Album" : "New Album"}
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                placeholder="Album Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60"
              />
              <input
                type="date"
                placeholder="Release Date"
                value={formData.releaseDate}
                onChange={(e) =>
                  setFormData({ ...formData, releaseDate: e.target.value })
                }
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60"
              />
              <input
                type="url"
                placeholder="Album Cover Image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60 md:col-span-2"
              />
              <input
                type="text"
                placeholder="Artists (comma-separated)"
                value={formData.artists}
                onChange={(e) =>
                  setFormData({ ...formData, artists: e.target.value })
                }
                required
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60 md:col-span-2"
              />
              <input
                type="url"
                placeholder="Streaming Link (e.g., Spotify, Apple Music)"
                value={formData.streamingUrl}
                onChange={(e) =>
                  setFormData({ ...formData, streamingUrl: e.target.value })
                }
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60 md:col-span-2"
              />
            </div>

            <textarea
              placeholder="Album Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              required
              className="w-full rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60 min-h-24"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded-lg bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bg"
              >
                {editingId ? "Update Album" : "Create Album"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    title: "",
                    description: "",
                    image: "",
                    artists: "",
                    releaseDate: "",
                    streamingUrl: "",
                  });
                }}
                className="rounded-lg border border-gold/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Albums list */}
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-ivory/60">Loading albums...</p>
          ) : albums.length === 0 ? (
            <p className="text-ivory/60">No albums yet. Add your first album!</p>
          ) : (
            albums.map((album) => (
              <div
                key={album.id}
                className="rounded-lg border border-gold/30 bg-bg-raise/50 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-ivory text-sm sm:text-base">{album.title}</h3>
                  <p className="text-xs sm:text-sm text-gold mt-1">{album.artists}</p>
                  <p className="text-xs sm:text-sm text-ivory/60 mt-2 line-clamp-2">
                    {album.description}
                  </p>
                  {album.releaseDate && (
                    <p className="text-xs text-ivory/50 mt-2">
                      Released: {album.releaseDate}
                    </p>
                  )}
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleEdit(album)}
                    className="flex-1 sm:flex-none p-2.5 sm:p-2 rounded-lg border border-gold/50 text-gold hover:bg-gold/10 transition-colors"
                  >
                    <Edit2 className="h-4 w-4 mx-auto sm:mx-0" aria-hidden />
                  </button>
                  <button
                    onClick={() => handleDelete(album.id)}
                    className="flex-1 sm:flex-none p-2.5 sm:p-2 rounded-lg border border-red-500/50 text-red-500 hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 mx-auto sm:mx-0" aria-hidden />
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
