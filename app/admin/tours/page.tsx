"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Edit2 } from "lucide-react";
import toast from "react-hot-toast";

interface Tour {
  id: number;
  title: string;
  month: string;
  day: number;
  place: string;
  venue?: string;
  time?: string;
  note?: string;
}

export default function ToursAdminPage() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    month: "",
    day: "",
    place: "",
    venue: "",
    time: "",
    note: "",
  });

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const res = await fetch("/api/tours");
      if (res.ok) {
        setTours(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch tours", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/tours/${editingId}` : "/api/tours";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingId ? "Tour updated!" : "Tour created!");
        setFormData({
          title: "",
          month: "",
          day: "",
          place: "",
          venue: "",
          time: "",
          note: "",
        });
        setEditingId(null);
        setShowForm(false);
        fetchTours();
      } else {
        toast.error("Failed to save tour");
      }
    } catch (error) {
      console.error("Failed to save tour", error);
      toast.error("Error saving tour");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this tour?")) return;

    try {
      const res = await fetch(`/api/tours/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Tour deleted!");
        fetchTours();
      } else {
        toast.error("Failed to delete tour");
      }
    } catch (error) {
      console.error("Failed to delete tour", error);
      toast.error("Error deleting tour");
    }
  };

  const handleEdit = (tour: Tour) => {
    setFormData({
      title: tour.title,
      month: tour.month,
      day: tour.day.toString(),
      place: tour.place,
      venue: tour.venue || "",
      time: tour.time || "",
      note: tour.note || "",
    });
    setEditingId(tour.id);
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
          <h1 className="display text-3xl sm:text-3xl text-ivory">Tours & Events</h1>
        </div>

        {/* Add button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-8 rounded-lg bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bg"
          >
            + Add Tour
          </button>
        )}

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-12 rounded-2xl border border-gold/30 bg-bg-raise/50 p-6 sm:p-8 space-y-6"
          >
            <h3 className="text-xl font-bold text-ivory">
              {editingId ? "Edit Tour" : "New Tour"}
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                placeholder="Tour Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60"
              />
              <input
                type="text"
                placeholder="Month (e.g., January)"
                value={formData.month}
                onChange={(e) =>
                  setFormData({ ...formData, month: e.target.value })
                }
                required
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60"
              />
              <input
                type="number"
                placeholder="Day"
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
                required
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60"
              />
              <input
                type="text"
                placeholder="City/Location"
                value={formData.place}
                onChange={(e) =>
                  setFormData({ ...formData, place: e.target.value })
                }
                required
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60"
              />
              <input
                type="text"
                placeholder="Venue (optional)"
                value={formData.venue}
                onChange={(e) =>
                  setFormData({ ...formData, venue: e.target.value })
                }
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60"
              />
              <input
                type="text"
                placeholder="Time (optional)"
                value={formData.time}
                onChange={(e) =>
                  setFormData({ ...formData, time: e.target.value })
                }
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60"
              />
            </div>

            <textarea
              placeholder="Tour Note (tagline)"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              className="w-full rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60 min-h-24"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded-lg bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bg"
              >
                {editingId ? "Update Tour" : "Create Tour"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    title: "",
                    month: "",
                    day: "",
                    place: "",
                    venue: "",
                    time: "",
                    note: "",
                  });
                }}
                className="rounded-lg border border-gold/50 px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-gold"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Tours list */}
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-ivory/60">Loading tours...</p>
          ) : tours.length === 0 ? (
            <p className="text-ivory/60">No tours yet. Create your first tour!</p>
          ) : (
            tours.map((tour) => (
              <div
                key={tour.id}
                className="rounded-lg border border-gold/30 bg-bg-raise/50 p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-0"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-ivory text-sm sm:text-base">{tour.title}</h3>
                  <p className="text-xs sm:text-sm text-ivory/60 mt-1">
                    {tour.month} {tour.day} • {tour.place}
                    {tour.venue && ` • ${tour.venue}`}
                  </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleEdit(tour)}
                    className="flex-1 sm:flex-none p-2.5 sm:p-2 rounded-lg border border-gold/50 text-gold hover:bg-gold/10 transition-colors"
                  >
                    <Edit2 className="h-4 w-4 mx-auto sm:mx-0" aria-hidden />
                  </button>
                  <button
                    onClick={() => handleDelete(tour.id)}
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
