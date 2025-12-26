const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

class HttpClient {
    private getAuthHeader(): Record<string, string> {
        const token = localStorage.getItem('authtoken');
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }

    async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            ...this.getAuthHeader(),
        };
        if (options.headers instanceof Headers) {
            options.headers.forEach((value, key) => {
                headers[key] = value;
            });
        } else if (options.headers) {
            Object.assign(headers, options.headers);
        }
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }
    get<T>(endpoint: string) {
        return this.request<T>(endpoint, { method: 'GET' });
    }
    post<T>(endpoint: string, data?: any) {
        return this.request<T>(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
        });
    }
    put<T>(endpoint: string, data?: any) {
        return this.request<T>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        });
    }
    delete<T>(endpoint: string) {
        return this.request<T>(endpoint, { method: 'DELETE' });
    }
}

export const http = new HttpClient();