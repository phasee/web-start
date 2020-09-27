export function slugify (text) {
  return text
    ? text
      .replace(/\s+/g, '-') // Replace spaces with hyphen
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, '') // Trim - from end of text
      .toLowerCase()
    : ''
}
