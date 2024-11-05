import apiClient from '@/plugins/axios';

export async function login(credentials) {
    const response = await apiClient.post('/token/', credentials);
    const { access, refresh } = response.data;

    // Store tokens in localStorage
    localStorage.setItem('accessToken', access);
    localStorage.setItem('refreshToken', refresh);

    return { access, refresh };
}

export async function refreshToken() {
    const refresh = localStorage.getItem('refreshToken');
    if (!refresh) throw new Error('No refresh token found');

    const response = await apiClient.post('/token/refresh/', { refresh });
    const { access } = response.data;

    // Update the access token in localStorage
    localStorage.setItem('accessToken', access);

    return access;
}