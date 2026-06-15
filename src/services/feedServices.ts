import {apiClient} from '@/lib/apiClient'
import {endpoints} from '@/api/endpoints'

export const feedServices = {
    async getHomeFeed(){
        const response = await apiClient.get(endpoints.feed.getHomeFeed)
        return response.data
    },
    async getFollowingFeed(){
        const response = await apiClient.get(endpoints.feed.getFollowingFeed)
        return response.data
    },
    async getTrendingFeed(){
        const response = await apiClient.get(endpoints.feed.getTrendingFeed)
        return response.data
    },
}