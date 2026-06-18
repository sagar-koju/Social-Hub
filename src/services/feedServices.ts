import {apiClient} from '@/lib/apiClient'
import {endpoints} from '@/api/endpoints'

export const feedServices = {
    async getHomeFeed({ limit, cursor }: { limit?: number; cursor?: string }) {
        const params: any = { limit };
        if (cursor) {
            params.cursor = cursor;
        }
        const response = await apiClient.get(endpoints.feed.getHomeFeed, {params,})
        return response.data
    },
    async getFollowingFeed(payload: { limit?: number; cursor?: string }) {
        const response = await apiClient.get(endpoints.feed.getFollowingFeed, {params: payload})
        return response.data
    },
    async getTrendingFeed(payload: { limit?: number; cursor?: string }) {
        const response = await apiClient.get(endpoints.feed.getTrendingFeed, {params: payload})
        return response.data
    },
}