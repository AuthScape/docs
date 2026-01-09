import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote } from 'next-mdx-remote';
import Head from 'next/head';
import DocsLayout from '../../components/layout/DocsLayout';
import MDXComponents from '../../components/mdx/MDXComponents';
import { getDocBySlug, getAllDocSlugs, extractHeadings } from '../../lib/mdx';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';

export default function DocPage({ source, frontMatter, headings }) {
  return (
    <>
      <Head>
        <title>{frontMatter.title ? `${frontMatter.title} - AuthScape Docs` : 'AuthScape Docs'}</title>
        {frontMatter.description && (
          <meta name="description" content={frontMatter.description} />
        )}
      </Head>
      <DocsLayout frontMatter={frontMatter} headings={headings}>
        <MDXRemote {...source} components={MDXComponents} />
      </DocsLayout>
    </>
  );
}

export async function getStaticPaths() {
  const slugs = getAllDocSlugs();

  return {
    paths: slugs.map((slug) => ({
      params: { slug },
    })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const doc = getDocBySlug(params.slug);

  if (!doc) {
    return {
      notFound: true,
    };
  }

  const mdxSource = await serialize(doc.content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypeSlug],
      format: 'mdx',
      development: process.env.NODE_ENV === 'development',
    },
    scope: doc.frontMatter,
    parseFrontmatter: false,
  });

  const headings = extractHeadings(doc.content);

  return {
    props: {
      source: mdxSource,
      frontMatter: doc.frontMatter,
      headings,
    },
  };
}
