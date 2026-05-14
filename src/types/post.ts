export type Post = {
  id: string;
  userId: string;
  content: string;
  img?: string;
  likes: number;
  comments: number;
  timestamp: string;
};