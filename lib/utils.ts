/**
 * Convert a title to a URL-safe slug
 * "3Point6 announces debut album 'Legendary'" → "3point6-announces-debut-album-legendary"
 */
export function titleToSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "") // Remove special chars
    .trim()
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Collapse multiple hyphens
}

/**
 * Find an article by slug
 */
export function getArticleBySlug(slug: string, articles: readonly any[]) {
  return articles.find((article) => titleToSlug(article.title) === slug);
}

/**
 * Find a tour by slug
 */
export function getTourBySlug(slug: string, tours: readonly any[]) {
  return tours.find((tour) => titleToSlug(tour.title) === slug);
}
