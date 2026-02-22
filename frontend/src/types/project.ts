export interface Project {
  id: string;
  name: string;
  api_key?: string;
  created_at: string;
}

export interface CreateProjectPayload {
  name: string;
}


