import { apiClient } from "@/lib/apiClient";
import { endpoints } from "@/api/endpoints";
import type { UserProfile } from "@/types/userProfile";

export const userServices = {
    async getMyProfile(): Promise<UserProfile> {
        const { data } = await apiClient.get<UserProfile>(endpoints.users.getMyProfile);
        return data;
    },
    async updateMyProfile(paylod: { displayName: string, bio: string, isPrivate: boolean }) {
        const { data } = await apiClient.put(endpoints.users.updateMyProfile, paylod);
        return data;
    },
    async deleteMyProfile() {
        const { data } = await apiClient.delete(endpoints.users.deleteMyProfile);
        return data;
    },
    async searchUsers(paylod: { username: string }) {
        const { data } = await apiClient.get(endpoints.users.searchUsers, { params: paylod });
        return data;
    },
    async getBlockedUsers() {
        const { data } = await apiClient.get(endpoints.users.getBlockedUsers);
        return data;
    },
    async getMutedUsers() {
        const { data } = await apiClient.get(endpoints.users.getMutedUsers);
        return data;
    },
    async getUserProfile(payload: { username: string }) {
        const { data } = await apiClient.get(endpoints.users.getBlockedUsers, { params: payload });
        return data;
    },
    async followUser(payload: { username: string }) {
        const { data } = await apiClient.post(endpoints.users.followUser, { params: payload });
        return data;
    },
    async unfollowUser(payload: { username: string }) {
        const { data } = await apiClient.delete(endpoints.users.unfollowUser, { params: payload });
        return data;
    },
    async getFollowers(payload: { username: string }) {
        const { data } = await apiClient.get(endpoints.users.getFollowers, { params: payload });
        return data;
    },
    async getFollowing(payload: { username: string }) {
        const { data } = await apiClient.get(endpoints.users.getFollowing, { params: payload });
        return data;
    },
    async blockUser(payload: { username: string }) {
        const { data } = await apiClient.post(endpoints.users.blockUser, { params: payload });
        return data;
    },
    async unblockUser(payload: { username: string }) {
        const { data } = await apiClient.delete(endpoints.users.unblockUser, { params: payload });
        return data;
    },
    async muteUser(payload: { username: string }) {
        const { data } = await apiClient.post(endpoints.users.muteUser, { params: payload });
        return data;
    },
    async unmuteUser(payload: { username: string }) {
        const { data } = await apiClient.delete(endpoints.users.unmuteUser, { params: payload });
        return data;
    },
}