export interface Student {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string;
  picture?: string;
  class_id: number;
  class_name?: string;
}

export interface StudentsResponse {
  status: boolean;
  message?: string;
  result: Array<Student> | Student;
}