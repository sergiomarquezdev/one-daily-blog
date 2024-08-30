export interface DbPost {
  id: number;
  title: string;
  url_slug: string;
  content: string;
  content_resume: string;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  author: string;
  post_tags: string[];
}
