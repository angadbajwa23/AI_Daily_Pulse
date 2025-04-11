'use server';

/**
 * @fileOverview A flow for summarizing news articles or research papers using AI.
 *
 * - summarizeArticle - A function that summarizes the article content.
 * - SummarizeArticleInput - The input type for the summarizeArticle function.
 * - SummarizeArticleOutput - The return type for the summarizeArticle function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const SummarizeArticleInputSchema = z.object({
  articleTitle: z.string().describe('The title of the article to be summarized.'),
  articleUrl: z.string().describe('The URL of the article.'),
  articleContent: z.string().describe('The main content of the article.'),
});
export type SummarizeArticleInput = z.infer<typeof SummarizeArticleInputSchema>;

const SummarizeArticleOutputSchema = z.object({
  summary: z.string().describe('A concise AI-generated summary of the article.'),
});
export type SummarizeArticleOutput = z.infer<typeof SummarizeArticleOutputSchema>;

export async function summarizeArticle(input: SummarizeArticleInput): Promise<SummarizeArticleOutput> {
  return summarizeArticleFlow(input);
}

const summarizeArticlePrompt = ai.definePrompt({
  name: 'summarizeArticlePrompt',
  input: {
    schema: z.object({
      articleTitle: z.string().describe('The title of the article to be summarized.'),
      articleContent: z.string().describe('The main content of the article.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A concise AI-generated summary of the article.'),
    }),
  },
  prompt: `Summarize the following news article or research paper in a concise manner. The summary should capture the key takeaways and main points of the article.

Title: {{{articleTitle}}}
Content: {{{articleContent}}}

Summary:`,
});

const summarizeArticleFlow = ai.defineFlow<
  typeof SummarizeArticleInputSchema,
  typeof SummarizeArticleOutputSchema
>({
  name: 'summarizeArticleFlow',
  inputSchema: SummarizeArticleInputSchema,
  outputSchema: SummarizeArticleOutputSchema,
},
async input => {
  const {output} = await summarizeArticlePrompt(input);
  return output!;
});
