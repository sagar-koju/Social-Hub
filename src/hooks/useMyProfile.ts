import { useQuery } from '@tanstack/react-query';
import { userServices } from '@/services/userServices';

export const useGetMyProfile = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: userServices.getMyProfile,
        retry: false, // Don't retry on failure (e.g., if the user is not authenticated)
    });
}