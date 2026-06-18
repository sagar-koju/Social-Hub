import { apiClient } from "@/lib/apiClient"
import { endpoints } from "@/api/endpoints"

export const postServices = {
    async createPost(payload: { content: string; visibility: string }) {
        const { data } = await apiClient.post(endpoints.posts.createPost, payload);
        return data;
    },

    async getPostById(payload: { postId: string }) {
        const { data } = await apiClient.get(endpoints.posts.getPostById, { params: payload });
        return data;
    },

    async updatePost(payload: { postId: string; content: string; visibility: string }) {
        const { data } = await apiClient.patch(endpoints.posts.updatePost, { params: payload });
        return data;
    },

    async deletePost(payload: { postId: string }) {
        const { data } = await apiClient.delete(endpoints.posts.deletePost, { params: payload });
        return data;
    },

    async getUsersWhoLikedPost(payload: { postId: string; limit?: number; cursor?: string }) {
        const { data } = await apiClient.get(endpoints.posts.getUsersWhoLikedPost, { params: payload });
        return data;
    },

    async likePost({ postId, limit, cursor }: { postId: string; limit?: number; cursor?: string }) {
        const { data } = await apiClient.post(endpoints.posts.likePost, { params: { postId, limit, cursor } });
        return data;
    },

    async unlikePost({ postId, limit, cursor }: { postId: string; limit?: number; cursor?: string }) {
        const { data } = await apiClient.delete(endpoints.posts.likePost, { params: { postId, limit, cursor } });
        return data;
    },

    async getPostByUsername(payload:{ username: string; limit?: number; cursor?: string }) {
        const { username, limit, cursor } = payload;
        const { data } = await apiClient.get(endpoints.posts.getPostByUsername.replace("{username}", username), { params: { limit, ...(cursor && { cursor }) } });
        return data;
    },

    async createComment(payload: { postId: string; content: string }) {
        const { data } = await apiClient.post(endpoints.posts.createComment, payload);
        return data;
    },
    async getComments({ postId, limit, cursor }: { postId: string; limit?: number; cursor?: string }) {
        const { data } = await apiClient.get(endpoints.posts.getComments, { params: { postId, limit, cursor } });
        return data;
    },
    async likeComment({ commentId, limit, cursor }: { commentId: string; limit?: number; cursor?: string }) {
        const { data } = await apiClient.post(endpoints.posts.likeComment, { params: { commentId, limit, cursor } });
        return data;
    },

    async unlikeComment({ commentId, limit, cursor }: { commentId: string; limit?: number; cursor?: string }) {
        const { data } = await apiClient.delete(endpoints.posts.likeComment, { params: { commentId, limit, cursor } });
        return data;
    },

    async deleteComment(payload: { commentId: string }) {
        const { data } = await apiClient.delete(endpoints.posts.deleteComment, { params: payload });
        return data;
    },
    async getReplyComments({ commentId, limit, cursor }: { commentId: string; limit?: number; cursor?: string }) {
        const { data } = await apiClient.get(endpoints.posts.getReplyComments, { params: { commentId, limit, cursor } });
        return data;
    },
    async createReplyComment(payload: { commentId: string; content: string }) {
        const { data } = await apiClient.post(endpoints.posts.createReplyComment, payload);
        return data;
    },

    async bookmarkPost(payload: { postId: string }) {
        const { data } = await apiClient.post(endpoints.posts.bookmarkPost, payload);
        return data;
    },
    async removeBookmark(payload: { postId: string }) {
        const { data } = await apiClient.delete(endpoints.posts.bookmarkPost, { params: payload });
        return data;
    },

    async getMyBookmarks({ limit, cursor }: { limit?: number; cursor?: string }) {
        const { data } = await apiClient.get(endpoints.posts.getMyBookmarks, { params: { limit, cursor } });
        return data;
    },

    async getPostByHashtag({ hashtag, limit, cursor }: { hashtag: string; limit?: number; cursor?: string }) {
        const { data } = await apiClient.get(endpoints.posts.getPostByHashtag, { params: { hashtag, limit, cursor } });
        return data;
    },


    // createPost: 'api/v1/posts',
    //     getPostById: 'api/v1/posts/{postId}',
    //     updatePost: 'api/v1/posts/{postId}',
    //     deletePost: 'api/v1/posts/{postId}',
    //     likedPost: 'api/v1/posts/{postId}/likes',
    //     getPostByUsername: 'api/v1/users/{username}/posts',
    //     likePost: 'api/v1/posts/{postId}/like',
    //     unlikePost: 'api/v1/posts/{postId}/like',
    //     createComment: 'api/v1/posts/{postId}/comments',
    //     getComments: 'api/v1/posts/{postId}/comments',
    //     likeComment: 'api/v1/comments/{commentId}/like',
    //     unlikeComment: 'api/v1/comments/{commentId}/like',
    //     deleteComment: 'api/v1/comments/{commentId}',
    //     getReplyComments: 'api/v1/comments/{commentId}/replies',
    //     createReplyComment: 'api/v1/comments/{commentId}/replies',
    //     bookmarkPost: 'api/v1/posts/{postId}/bookmark',
    //     removeBookmark: 'api/v1/posts/{postId}/bookmark',
    //     getMyBookmarks: 'api/v1/users/me/bookmarks',
    //     getPostByHashtag: 'api/v1/hashtags/{hashtag}/posts',
}