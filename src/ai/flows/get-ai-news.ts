import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {RssFeedItem} from '@/services/rss-feed';

const GetAiNewsOutputSchema = z.array(
  z.object({
    title: z.string(),
    url: z.string(),
    sourceName: z.string(),
    publishedDate: z.string(),
    summary: z.string(),
  })
);

const getAiNewsPrompt = ai.definePrompt({
  name: 'getAiNewsPrompt',
  input: z.object({
    query: z.string(),
  }),
  output: z.object({
    summary: z.string(),
  }),
  prompt: `Provide a concise summary of the following topic:\n\n{{{query}}}\n\nSummary:`,
});


export const getAiNews = ai.defineFlow({
  name: 'getAiNews',
  inputSchema: z.string(),
  outputSchema: GetAiNewsOutputSchema,
}, async (query) => {
  const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

  const createNewsItem = async (searchQuery: string): Promise<RssFeedItem> => {
    const {output} = await getAiNewsPrompt({query: searchQuery});
    return {
      title: searchQuery,
      url: 'ai-summary',
      sourceName: 'AI-Generated Summary',
      publishedDate: today,
      summary: output!.summary,
    };
  };

  const newsItems: RssFeedItem[] = [];

  if (query === 'latest AI news' || query === 'recent developments in AI') {
    newsItems.push(await createNewsItem(query));
  } else {
    newsItems.push(await createNewsItem('latest AI news'));
    newsItems.push(await createNewsItem('recent developments in AI'));
  }
  
  return newsItems;
});