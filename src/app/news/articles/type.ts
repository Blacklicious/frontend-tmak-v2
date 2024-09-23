interface Audio {
    id: number;
    audio: string;
    language: string;
  }
  
  interface Image {
    id: number;
    image: string;
    caption: string;
  }
  
  interface ContentParagraph {
    title: string;
    content: string;
  }
  
  interface Article {
    id: number;
    category: string;
    title: { [key: string]: string }; // Title in multiple languages
    content_introduction: { [key: string]: string }; // Introduction in multiple languages
    content: { [key: string]: ContentParagraph[] }; // Content in multiple languages
    content_conclusion: { [key: string]: string }; // Conclusion in multiple languages
    tags: string[];
    status: string;
    views: number;
    platform: string;
    date: string;
    country: string;
    publisher: string;
    images: Image[]; // Array of images
    audios: Audio[]; // Array of audios
  }