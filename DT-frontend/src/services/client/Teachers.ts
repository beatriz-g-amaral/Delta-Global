import { ApiCallResponse, ApiCallType, apiManager, BodyType } from '../ApiManager';
import { TeachersResponse } from '../../types/Teachers';


export class TeachersCall {
  static async list({ token }: { token: string }): Promise<ApiCallResponse<TeachersResponse>> {
    const apiURL = import.meta.env.VITE_API_URL;

    return apiManager.makeApiCall<TeachersResponse>({
      apiUrl: `${apiURL}/teachers`,
      callType: ApiCallType.GET,
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }

  static async create({
    token,
    name,
    password,
    email,
    pictureFile,
    subject,
  }: {
    token: string;
    name: string;
    email: string;
    subject: string;   
    password: string; 
    pictureFile?: File;
  }): Promise<ApiCallResponse<TeachersResponse>> {
    const apiURL = import.meta.env.VITE_API_URL;

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('password', password);
    
    if (pictureFile) {
      formData.append('picture', pictureFile);
    }

    return apiManager.makeApiCall<TeachersResponse>({
      apiUrl: `${apiURL}/teachers`,
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
    password,
    email,
    pictureFile,
    subject,
  }: {
    token: string;
    id: number;
    name: string;
    password?: string;
    email: string;
    pictureFile?: File;
    subject: string;
  }): Promise<ApiCallResponse<TeachersResponse>> {
    const apiURL = import.meta.env.VITE_API_URL;

    const formData = new FormData();
    formData.append('_method', 'PUT');
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);

    if (password && password.trim() !== "") {
      formData.append('password', password);
    }

    if (pictureFile) {
      formData.append('picture', pictureFile);
    }

    return apiManager.makeApiCall<TeachersResponse>({
      apiUrl: `${apiURL}/teachers/${id}`,
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
  }): Promise<ApiCallResponse<TeachersResponse>> {
    const apiURL = import.meta.env.VITE_API_URL;

    return apiManager.makeApiCall<TeachersResponse>({
      apiUrl: `${apiURL}/teachers/${id}`,
      callType: ApiCallType.DELETE,
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }
}