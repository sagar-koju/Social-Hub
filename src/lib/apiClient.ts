import axios from 'axios';

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers = config.headers || {};
            config.headers['Authorization'] = `Bearer ${token}`;
        }
    }
    return config;
});

apiClient.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // If token expired
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // call refresh API
        const res = await apiClient.post("api/v1/auth/refresh");

        const newAccessToken = res.data.accessToken;

        // store new token
        localStorage.setItem("accessToken", newAccessToken);

        // update header of failed request
        originalRequest.headers["Authorization"] =
          `Bearer ${newAccessToken}`;

        // retry original request
        return apiClient(originalRequest);
      } catch (refreshError) {
        // refresh failed → logout user
        localStorage.removeItem("accessToken");
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

