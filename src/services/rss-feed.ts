import {getAiNews} from '@/ai/flows/get-ai-news';

/**
 * Represents a news item from an RSS feed.
 */
export interface RssFeedItem {
  /**
   * The title of the item.
   */
  title: string;
  /**
   * The URL of the item.
   */
  url: string;
  /**
   * The source of the item.
   */
  sourceName: string;
  /**
   * The date the item was published.
   */
  publishedDate: string;
  /**
   * A summary of the item.
   */
  summary: string;
}

/**
 * Asynchronously retrieves AI-related news from an RSS feed.
 *
 * @param feedUrl The URL of the RSS feed.
 * @returns A promise that resolves to an array of RssFeedItem objects.
 */
export async function getAINewsFromRssFeed(): Promise<RssFeedItem[]> {
  const news1 = await getAiNews('latest AI news');
  const news2 = await getAiNews('recent developments in AI');

  // Combine and return the results
  return [...news1, ...news2];
}

