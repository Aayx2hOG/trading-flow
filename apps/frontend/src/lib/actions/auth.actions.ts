import { http } from "../http";

export const authApi = {
    signUp: (data: { username: string; password: string; email: string }) =>
        http.post<{ userId: string, token: string }>('/auth/signup', data),
    signIn: (data: { username: string; password: string }) =>
        http.post<{ userId: string, token: string }>('/auth/signin', data),
    signOut: () => {
        localStorage.removeItem('authtoken');
    },
}