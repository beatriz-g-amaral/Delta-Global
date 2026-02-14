export interface Teacher {
  id: number;
  name: string;
  email: string;
  subject: string;
  picture: string;
  created_at: string;
}

export interface TeachersResponse {
  status: boolean;
  message?: string;
  result: Array<Teacher> | Teacher;
}