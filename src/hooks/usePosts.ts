import { postServices } from '@/services/postServices'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useGetPostByUsername = (username: string) => {
    return useInfiniteQuery({
        queryKey: ["posts-by-username", username],
        queryFn: ({pageParam}) => postServices.getPostByUsername({
            username, 
            cursor: pageParam, 
            limit: 10,
        }),
        initialPageParam: undefined,
        getNextPageParam: (lastPage) => {
            return lastPage.hasMore ? lastPage.nextCursor : undefined;
        },
        enabled: !!username,
        staleTime: 0,
        refetchOnMount: true,
        retry: false,
    });
}