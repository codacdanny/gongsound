"use client";

import { useEffect, useState, FormEvent } from "react";
import Link from "next/link";
import { ArrowLeft, Trash2, Edit2 } from "lucide-react";
import toast from "react-hot-toast";

interface NewsArticle {
  id: number;
  title: string;
  excerpt: string;
  body: string;
  tag: string;
  date: string;
  author?: string;
  image?: string;
}

export default function NewsAdminPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    body: "",
    tag: "",
    date: "",
    author: "",
    image: "",
  });

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch("/api/news");
      if (res.ok) {
        setArticles(await res.json());
      }
    } catch (error) {
      console.error("Failed to fetch articles", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/news/${editingId}` : "/api/news";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(editingId ? "Article updated!" : "Article created!");
        setFormData({
          title: "",
          excerpt: "",
          body: "",
          tag: "",
          date: "",
          author: "",
          image: "",
        });
        setEditingId(null);
        setShowForm(false);
        fetchArticles();
      }
    } catch (error) {
      console.error("Failed to save article", error);
      toast.error("Failed to save article");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this article?")) return;

    try {
      const res = await fetch(`/api/news/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Article deleted!");
        fetchArticles();
      }
    } catch (error) {
      console.error("Failed to delete article", error);
      toast.error("Failed to delete article");
    }
  };

  const handleEdit = (article: NewsArticle) => {
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      body: article.body,
      tag: article.tag,
      date: article.date,
      author: article.author || "",
      image: article.image || "",
    });
    setEditingId(article.id);
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
          <h1 className="display text-3xl sm:text-3xl text-ivory">News & Articles</h1>
        </div>

        {/* Add button */}
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="mb-8 rounded-lg bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bg"
          >
            + Add Article
          </button>
        )}

        {/* Form */}
        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-12 rounded-2xl border border-gold/30 bg-bg-raise/50 p-6 sm:p-8 space-y-6"
          >
            <h3 className="text-xl font-bold text-ivory">
              {editingId ? "Edit Article" : "New Article"}
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <input
                type="text"
                placeholder="Article Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60"
              />
              <input
                type="text"
                placeholder="Tag (e.g., News, Update)"
                value={formData.tag}
                onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
                required
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60"
              />
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60"
              />
              <input
                type="text"
                placeholder="Author"
                value={formData.author}
                onChange={(e) =>
                  setFormData({ ...formData, author: e.target.value })
                }
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60"
              />
              <input
                type="text"
                placeholder="Image URL (e.g., /images/article.jpg)"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className="rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60 md:col-span-2"
              />
            </div>

            <textarea
              placeholder="Excerpt (short summary)"
              value={formData.excerpt}
              onChange={(e) =>
                setFormData({ ...formData, excerpt: e.target.value })
              }
              required
              className="w-full rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60 min-h-20"
            />

            <textarea
              placeholder="Full Article Body (supports multiple paragraphs)"
              value={formData.body}
              onChange={(e) => setFormData({ ...formData, body: e.target.value })}
              required
              className="w-full rounded-lg border border-gold/30 bg-bg/50 px-4 py-3 text-ivory placeholder:text-ivory/40 focus:outline-none focus:border-gold/60 min-h-48"
            />

            <div className="flex gap-3">
              <button
                type="submit"
                className="rounded-lg bg-gold px-6 py-3 text-sm font-semibold uppercase tracking-[0.14em] text-bg"
              >
                {editingId ? "Update Article" : "Create Article"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                  setFormData({
                    title: "",
                    excerpt: "",
                    body: "",
                    tag: "",
                    date: "",
                    author: "",
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

        {/* Articles list */}
        <div className="space-y-4">
          {isLoading ? (
            <p className="text-ivory/60">Loading articles...</p>
          ) : articles.length === 0 ? (
            <p className="text-ivory/60">No articles yet. Write your first article!</p>
          ) : (
            articles.map((article) => (
              <div
                key={article.id}
                className="rounded-lg border border-gold/30 bg-bg-raise/50 p-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-0"
              >
                <div className="flex-1">
                  <h3 className="font-bold text-ivory text-sm sm:text-base">{article.title}</h3>
                  <p className="text-xs sm:text-sm text-ivory/60 mt-1">
                    {article.tag} • {article.date}
                    {article.author && ` • By ${article.author}`}
                  </p>
                  <p className="text-xs sm:text-sm text-ivory/50 mt-2 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  <button
                    onClick={() => handleEdit(article)}
                    className="flex-1 sm:flex-none p-2.5 sm:p-2 rounded-lg border border-gold/50 text-gold hover:bg-gold/10 transition-colors"
                  >
                    <Edit2 className="h-4 w-4 mx-auto sm:mx-0" aria-hidden />
                  </button>
                  <button
                    onClick={() => handleDelete(article.id)}
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
