import { postServices } from "../services/postServices";
import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useBookmarkPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (postId: string) => postServices.bookmarkPost({ postId }),

        onMutate: async (postId) => {
            await queryClient.cancelQueries({ queryKey: ["bookmarks"] });
            const previousBookmarks = queryClient.getQueryData(["bookmarks"]);

            queryClient.setQueryData(["bookmark"], (old: any) =>
                old?.map((p: any) =>
                    p.id === postId ? { ...p, isBookmarked: true } : p
                )
            );

            console.log("Previous bookmarks:", previousBookmarks);

            return { previousBookmarks };
        },

        onError: (_err, _postId, context) => {
            if (context?.previousBookmarks) {
                queryClient.setQueryData(["bookmarks"], context.previousBookmarks);
            }
        },

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
        }
    });
}

export const useUnbookmarkPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (postId: string) => postServices.removeBookmark({ postId }),

        onMutate: async (postId) => {
            await queryClient.cancelQueries({ queryKey: ["bookmarks"] });
            const previousBookmarks = queryClient.getQueryData(["bookmarks"]);

            queryClient.setQueryData(["bookmarks"], (old: any) => old?.filter((id: string) => id !== postId));


            return { previousBookmarks };
        },

        onError: (_err, _postId, context) => {
            if (context?.previousBookmarks) {
                queryClient.setQueryData(["bookmarks"], context.previousBookmarks);
            }
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
        },
    });
}

export const useGetBookmarks = () => {
    return useInfiniteQuery({
        queryKey: ["bookmarks"],
        queryFn: ({ pageParam }) => postServices.getMyBookmarks({
            cursor: pageParam,
            limit: 10
        }),
        initialPageParam: undefined as string | undefined,
        getNextPageParam: (lastPage) => lastPage.hasMore ? lastPage.nextCursor : undefined,
        enabled: true,
        retry: false,
    });
}
