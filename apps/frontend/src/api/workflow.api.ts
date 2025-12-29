import { http } from "@/lib/http";
import type { Edge, Node } from "@xyflow/react";

export interface Workflow {
    id: string;
    userId: string,
    nodes: Node[],
    edges: Edge[],
    name?: string;
    description?: string;
    webhookUrl?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Execution {
    id: string;
    workflowId: string;
    status: 'SUCCESS' | 'FAILURE';
    startTime: string;
    endTime: string | null;
}

export const workflowApi = {
    getAll: () => http.get<Workflow[]>('/workflows'),
    getById: (id: string) => http.get<Workflow>(`/workflow/${id}`),
    getExecutions: (id: string) => http.get<Execution[]>(`/workflow/executions/${id}`),
    create: (data: { nodes: Node[]; edges: Edge[]; name?: string; description?: string }) =>
        http.post<{ workflowId: string }>('/workflow', data),
    update: (id: string, data: { nodes: Node[]; edges: Edge[]; name?: string; description?: string }) =>
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