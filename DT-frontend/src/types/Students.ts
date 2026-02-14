export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string | undefined;
  picture?: string | undefined;
  class_id: number;
  class_name?: string | undefined;
}

export interface StudentsResponse {
  status: boolean;
  message?: string;
  result: Array<Student> | Student;
}