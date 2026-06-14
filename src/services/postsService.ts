import {apiClient} from "@/lib/apiClient"
import {endpoints} from "@/api/endpoints"

export const postsService = {
    async createPost(payload: { content: string; visibility: string }) {
        const {data} = await apiClient.post(endpoints.posts.createPost, payload);
        return data;
    }
}