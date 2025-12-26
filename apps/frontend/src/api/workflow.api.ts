import { http } from "@/lib/http";

export interface Workflow {
    id: string;
    userId: string,
    nodes: any[],
    edges: any[],
    webhookUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export const workflowApi = {
    getAll: () => http.get<Workflow[]>('/workflows'),
    getById: (id: string) => http.get<Workflow>(`/workflow/${id}`),
    create: (data: { nodes: any[]; edges: any[] }) =>
        http.post<{ workflowId: string }>('/workflow', data),
    update: (id: string, data: { nodes: any[]; edges: any[] }) =>
        http.put<{ workflowId: string; message: string }>(`/workflow/${id}`, data),
    delete: (id: string) =>
        http.delete<{ success: boolean; message: string }>(`/workflow/${id}`),
    execute: (id: string, triggerData?: any) =>
        http.post<{ executionId: string; status: string }>(`/workflow/${id}/execute`, { triggerData }),
    enable: (id: string) =>
        http.post<{ status: string }>(`/workflow/${id}/enable`),
    disable: (id: string) =>
        http.post<{ status: string }>(`/workflow/${id}/disable`),
    getWebhook: (id: string) =>
        http.get<{ webhookUrl: string; webhookId: string }>(`/workflow/${id}/webhook`),
};