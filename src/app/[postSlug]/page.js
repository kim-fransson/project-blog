import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";

import BlogHero from "@/components/BlogHero";

import styles from "./postSlug.module.css";
import { loadBlogPost } from "@/helpers/file-helpers";
import { BLOG_TITLE } from "@/constants";
import { COMPONENT_MAP } from "@/helpers/mdx-components-helpers";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }) {
  const { postSlug } = await params;
  const blogPost = await loadBlogPost(postSlug);

  if (!blogPost) {
    return notFound();
  }

  const { frontmatter } = blogPost;

  return {
    title: `${frontmatter.title} • ${BLOG_TITLE}`,
    description: frontmatter.abstract,
  };
}

async function BlogPost({ params }) {
  const { postSlug } = await params;
  const blogPost = await loadBlogPost(postSlug);

  if (!blogPost) {
    notFound();
  }

  const { frontmatter, content } = blogPost;

  return (
    <article className={styles.wrapper}>
      <BlogHero {...frontmatter} />
      <div className={styles.page}>
        <MDXRemote source={content} components={COMPONENT_MAP} />
      </div>
    </article>
  );
}

export default BlogPost;
