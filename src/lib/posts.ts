import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export interface PostData {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  contentHtml?: string;
  tags?: string[];
  readingTime?: number;
  next?: PostData;
  prev?: PostData;
}

export function getSortedPostsData(): PostData[] {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data as { title: string; date: string; excerpt: string }
    };
  });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    };
  });
}

export function getReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

export function getNextPrevPosts(currentId: string): { next?: PostData; prev?: PostData } {
  const allPosts = getSortedPostsData();
  const currentIndex = allPosts.findIndex(post => post.id === currentId);
  
  return {
    next: currentIndex > 0 ? allPosts[currentIndex - 1] : undefined,
    prev: currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : undefined
  };
}

export async function getPostData(id: string): Promise<PostData> {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  
  // Calculate reading time
  const readingTime = getReadingTime(matterResult.content);

  // Get next/prev posts
  const { next, prev } = getNextPrevPosts(id);

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    readingTime,
    next,
    prev,
    ...matterResult.data as { title: string; date: string; excerpt: string; tags?: string[] }
  };
}