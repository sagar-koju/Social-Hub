export type Post = {
  id: string;
  authorId: string;
  visibility: string;
  postType: string;
  content: string;
  img?: string;
  likes: number;
  shares: number;
  comments: number;
  timestamp: string;
  author: {
    id: string;
    username: string;
    displayName: string;
    avatar?: string;
    isVerified: boolean;
  },
  isLiked: boolean;
  isBookmarked: boolean;
};