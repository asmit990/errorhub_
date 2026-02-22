import { apiRequest } from "./client";
import type { ErrorListResponse } from "@/types/error";

export function getProjectErrors(projectId: string): Promise<ErrorListResponse> {
  return apiRequest<ErrorListResponse>(`/projects/${projectId}/errors`);
}
