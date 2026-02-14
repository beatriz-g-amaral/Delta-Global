export interface Classes {
  id: number;
  name: string;
  teacher_id: number;
  teacher_name?: string; 
  created_at: string;
}

export interface ClassesResponse {
  status: boolean;
  message?: string;
  result: Array<Classes> | Classes;
}