import { useQuery } from '@tanstack/react-query';
import { userServices } from '@/services/userServices';
import { UserProfile } from '@/types/userProfile';

export const useGetMyProfile = () => {
    return useQuery({
        queryKey: ["me"],
        queryFn: userServices.getMyProfile,
        retry: false, // Don't retry on failure (e.g., if the user is not authenticated)
    });
}
export const useGetUserProfile = (username: string) => {
    return useQuery({
        queryKey: ["profile", username],
        queryFn: () => userServices.getUserProfile({ username }),
        retry: false,
    });
}