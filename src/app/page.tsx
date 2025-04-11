'use client';

import React from 'react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarInput,
} from '@/components/ui/sidebar';
import {ModeToggle} from '@/components/mode-toggle';
import {Button} from '@/components/ui/button';
import {Icons} from '@/components/icons';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {NewsArticle} from '@/services/news-api';
import {getAINews} from '@/services/news-api';
import {ArxivPaper} from '@/services/arxiv-api';
import {getAIResearchPapers} from '@/services/arxiv-api';
import {RssFeedItem} from '@/services/rss-feed';
import {getAINewsFromRssFeed} from '@/services/rss-feed';
import {useEffect, useState} from 'react';

const rssFeedUrl = 'https://www.artificialintelligence-news.com/feed/';

export default function Home() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [papers, setPapers] = useState<ArxivPaper[]>([]);
  const [rssFeedItems, setRssFeedItems] = useState<RssFeedItem[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const newsData = await getAINews();
      setNews(newsData);

      const papersData = await getAIResearchPapers('cs.AI');
      setPapers(papersData);

      const rssData = await getAINewsFromRssFeed(rssFeedUrl);
      setRssFeedItems(rssData);
    };

    loadData();
  }, []);

  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar collapsible="icon">
          <SidebarHeader className="h-14 lg:h-auto">
            <Button variant="ghost" className="px-2">
              <Icons.logo className="mr-2 h-4 w-4"/>
              <span className="text-sm font-bold">AIDailyPulse</span>
            </Button>
          </SidebarHeader>
          <SidebarInput placeholder="Search..."/>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Sources</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icons.home className="mr-2 h-4 w-4"/>
                    <span>Overview</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icons.messageSquare className="mr-2 h-4 w-4"/>
                    <span>News</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icons.file className="mr-2 h-4 w-4"/>
                    <span>Research</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Icons.externalLink className="mr-2 h-4 w-4"/>
                    <span>RSS Feed</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <div className="flex items-center justify-center">
              <ModeToggle/>
            </div>
          </SidebarFooter>
        </Sidebar>
        <div className="flex-1 p-4">
          <h1 className="text-2xl font-bold mb-4">AI Daily Pulse</h1>
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">AI News</h2>
            {news.map((article, index) => (
              <Card key={index} className="mb-4">
                <CardHeader>
                  <CardTitle>
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </CardTitle>
                  <CardDescription>Source: {article.sourceName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{article.summary}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">AI Research Papers</h2>
            {papers.map((paper, index) => (
              <Card key={index} className="mb-4">
                <CardHeader>
                  <CardTitle>
                    <a href={paper.url} target="_blank" rel="noopener noreferrer">
                      {paper.title}
                    </a>
                  </CardTitle>
                  <CardDescription>Authors: {paper.authors}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{paper.summary}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-2">AI News from RSS Feed</h2>
            {rssFeedItems.map((item, index) => (
              <Card key={index} className="mb-4">
                <CardHeader>
                  <CardTitle>
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                  </CardTitle>
                  <CardDescription>Source: {item.sourceName}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{item.summary}</p>
                </CardContent>
              </Card>
            ))}
          </section>
        </div>
      </div>
    </SidebarProvider>
  );
}
