export type ArticleStatus = 'published' | 'draft';

export interface Article {
  id?: string;
  title: string;
  category: string;
  htmlContent?: string;
  content?: string;
  author?: string;
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  isPublic?: boolean;
  isPublished?: boolean;
  isDraft?: boolean;
  metadata?: ArticleMetadata;
  coverImage?: string;
  thumbnailImage?: string;
  attachments?: {
    file: string;
    type: string;
  }[];
  status?: ArticleStatus;
  publishedAt?: string;
  slug?: string;
}

export type TArticleList = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  result: Article[];
};

export interface ArticleMetadata {
  category: string;
  language: string;
  views: number;
}
