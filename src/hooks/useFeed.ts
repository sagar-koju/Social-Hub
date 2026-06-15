import { useQuery } from '@tanstack/react-query';
import { feedServices } from '@/services/feedServices';

export const useGetHomeFeed = () => {
    return useQuery({
        queryKey: ["home-feed"],
        queryFn: feedServices.getHomeFeed,
        retry: false, // Don't retry on failure (e.g., if the user is not authenticated)
    });
}
export const useGetFollowingFeed = () => {
    return useQuery({
        queryKey: ["following-feed"],
        queryFn: feedServices.getFollowingFeed,
        retry: false,
    });
}
export const useGetTrendingFeed = () => {
    return useQuery({
        queryKey: ["trending-feed"],
        queryFn: feedServices.getTrendingFeed,
        retry: false,
    });
}   