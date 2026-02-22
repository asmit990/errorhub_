export interface ErrorEntry {
  id: string;
  message: string;
  projectId: string;

  filename?: string;
  lineno?: number;
  colno?: number;

  timestamp?: number;
  created_at?: string;

  environment?: string;
}

export interface ErrorListResponse {
  data: ErrorEntry[];
  count: number;
}
