import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentDirectory = path.join(process.cwd(), 'content');

export function getDocBySlug(slug) {
  const slugPath = Array.isArray(slug) ? slug.join('/') : slug;
  const fullPath = path.join(contentDirectory, `${slugPath}.mdx`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    frontMatter: data,
    content,
    slug: slugPath,
  };
}

export function getAllDocSlugs() {
  const slugs = [];

  function walkDir(dir, basePath = []) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        walkDir(filePath, [...basePath, file]);
      } else if (file.endsWith('.mdx')) {
        const slug = [...basePath, file.replace('.mdx', '')];
        slugs.push(slug);
      }
    }
  }

  if (fs.existsSync(contentDirectory)) {
    walkDir(contentDirectory);
  }

  return slugs;
}

export function extractHeadings(content) {
  const headings = [];
  const lines = content.split('\n');

  for (const line of lines) {
    const h2Match = line.match(/^## (.+)$/);
    const h3Match = line.match(/^### (.+)$/);

    if (h2Match) {
      const text = h2Match[1].replace(/`/g, '');
      headings.push({
        level: 2,
        text,
        id: text.toLowerCase().replace(/[^\w]+/g, '-'),
      });
    } else if (h3Match) {
      const text = h3Match[1].replace(/`/g, '');
      headings.push({
        level: 3,
        text,
        id: text.toLowerCase().replace(/[^\w]+/g, '-'),
      });
    }
  }

  return headings;
}
