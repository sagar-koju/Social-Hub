import {useQuery} from '@tanstack/react-query';
import { authService } from "@/services/authService";
import { queryKeys } from "@/query-keys";

export const useCurrentUser = () => {
    return useQuery({
        queryKey: queryKeys.me,
        queryFn: authService.getCurrentUser,
        retry: false, // Don't retry on failure (e.g., if the user is not authenticated)
    });
}