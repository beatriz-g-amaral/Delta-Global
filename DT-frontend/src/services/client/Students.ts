import { ApiCallResponse, ApiCallType, apiManager, BodyType } from '../ApiManager';
import { StudentsResponse } from '../../types/Students';

export class StudentsCall {
  static async list({ token }: { token: string }): Promise<ApiCallResponse<StudentsResponse>> {
    const apiURL = import.meta.env.VITE_API_URL;

    return apiManager.makeApiCall<StudentsResponse>({
      apiUrl: `${apiURL}/students`,
      callType: ApiCallType.GET,
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }

  static async create({
    token,
    name,
    email,
    phone,
    address,
    pictureFile,
    class_id,
  }: {
    token: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    pictureFile?: File | undefined;
    class_id: number;
  }): Promise<ApiCallResponse<StudentsResponse>> {
    const apiURL = import.meta.env.VITE_API_URL;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('class_id', String(class_id));
    
    if (pictureFile) {
      formData.append('picture', pictureFile);
    }

    return apiManager.makeApiCall<StudentsResponse>({
      apiUrl: `${apiURL}/students`,
      callType: ApiCallType.POST,
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      bodyType: BodyType.MULTIPART,
      body: formData,
    });
  }

  static async update({
    token,
    id,
    name,
    email,
    phone,
    address,
    pictureFile,
    class_id,
  }: {
    token: string;
    id: number;
    name: string;
    email: string;
    phone: string;
    address: string;
    pictureFile?: File | undefined;
    class_id: number;
  }): Promise<ApiCallResponse<StudentsResponse>> {
    const apiURL = import.meta.env.VITE_API_URL;

    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('address', address);
    formData.append('class_id', String(class_id));

    if (pictureFile) {
      formData.append('picture', pictureFile);
    }

    return apiManager.makeApiCall<StudentsResponse>({
      apiUrl: `${apiURL}/students/${id}`,
      callType: ApiCallType.POST,
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      bodyType: BodyType.MULTIPART,
      body: formData,
    });
  }

  static async delete({
    token,
    id,
  }: {
    token: string;
    id: number;
  }): Promise<ApiCallResponse<StudentsResponse>> {
    const apiURL = import.meta.env.VITE_API_URL;

    return apiManager.makeApiCall<StudentsResponse>({
      apiUrl: `${apiURL}/students/${id}`,
      callType: ApiCallType.DELETE,
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }
}