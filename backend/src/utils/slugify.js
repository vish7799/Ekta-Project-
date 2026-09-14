/**
 * Generate SEO-friendly URL slug from string
 */
const slugify = (text) => {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[\s\_\-]+/g, '-')       // Replace spaces, underscores, hyphens with single -
    .replace(/[^\w\-]+/g, '')          // Remove all non-word chars
    .replace(/\-\-+/g, '-')            // Replace multiple - with single -
    .replace(/^-+/, '')                // Trim - from start
    .replace(/-+$/, '');               // Trim - from end
};

module.exports = slugify;
