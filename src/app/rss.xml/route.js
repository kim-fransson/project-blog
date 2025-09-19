import {
  BLOG_DESCRIPTION,
  BLOG_OWNER,
  BLOG_TITLE,
  BLOG_URL,
} from "@/constants";
import { getBlogPostList } from "@/helpers/file-helpers";
import RSS from "rss";

export async function GET(_request) {
  const blogPosts = await getBlogPostList();

  const rssFeed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    feed_url: `${BLOG_URL}/rss.xml}`,
    site_url: BLOG_URL,
    image_url: `${BLOG_URL}/favicon.ico`,
    managingEditor: BLOG_OWNER,
    webMaster: BLOG_OWNER,
    copyright: `2025 ${BLOG_OWNER}`,
    language: "en",
  });

  blogPosts.forEach((post) => {
    rssFeed.item({
      title: post.title,
      description: post.abstract,
      date: post.publishedOn,
      url: `${BLOG_URL}/${post.slug}`,
    });
  });

  const headers = new Headers({ "content-type": "application/xml" });

  return new Response(rssFeed.xml({ indent: true }), { headers });
}
