import { apiRequest } from "./client";
import type { Project, CreateProjectPayload } from "@/types/project";

export function getProjects(): Promise<Project[]> {
  return apiRequest<Project[]>("/projects");
}

export function getProject(id: string): Promise<Project> {
  return apiRequest<Project>(`/projects/${id}`);
}

export function createProject(payload: CreateProjectPayload): Promise<Project> {
  return apiRequest<Project>("/projects", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function deleteProject(projectId: string): Promise<{ success: true }> {
  return apiRequest(`/projects/${projectId}`, {
    method: "DELETE",
  });
}

