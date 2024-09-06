/* news/utils/contentData.ts */
import axios from 'axios';

export interface ContentItem {
  id: number;
  category: string;
  title: { [key: string]: string };
  content: { [key: string]: string };
  country: string;
  date: string;
  views: number;
  publisher: string;
  source: string;
  location: string;
  tags: string;
}

export const fetchContentData = async () => {
  try {
    const articlesResponse = await axios.get<ContentItem[]>('http://192.168.1.4:8000/api/v1/news/articles/');
    const magazinesResponse = await axios.get<ContentItem[]>('http://192.168.1.4:8000/api/v1/news/magazines/');
    const podcastsResponse = await axios.get<ContentItem[]>('http://192.168.1.4:8000/api/v1/news/podcasts/');
    const videosResponse = await axios.get<ContentItem[]>('http://192.168.1.4:8000/api/v1/news/videos/');

    console.log('Articles Data:', articlesResponse.data);
    console.log('Magazines Data:', magazinesResponse.data);
    console.log('Podcasts Data:', podcastsResponse.data);
    console.log('Videos Data:', videosResponse.data);

    // Parse the title and content fields
    const parseContent = (item: any) => {
      try {
        const Title = item.title;
        const Content = item.content;
        console.log('Sanitized Title:', Title);
        return {
          ...item,
          title: JSON.parse(Title),
          content: JSON.parse(Content),
        };
      } catch (error) {
        console.error('JSON Parsing Error:', error, item);
        return item; // Return the item unparsed if parsing fails
      }
    };

    return {
      articles: articlesResponse.data.map(parseContent),
      magazines: magazinesResponse.data.map(parseContent),
      podcasts: podcastsResponse.data.map(parseContent),
      videos: videosResponse.data.map(parseContent),
    };
  } catch (error) {
    console.error('Failed to fetch content data:', error);
    return {
      articles: [],
      magazines: [],
      podcasts: [],
      videos: [],
    };
  }
};