import { ApiCallResponse, ApiCallType, apiManager, BodyType } from '../ApiManager';
import { ClassesResponse } from '../../types/Classes';


export class ClassesCall {
  static async list({ token }: { token: string }): Promise<ApiCallResponse<ClassesResponse>> {
    const apiURL = import.meta.env.VITE_API_URL;

    return apiManager.makeApiCall<ClassesResponse>({
      apiUrl: `${apiURL}/classes`,
      callType: ApiCallType.GET,
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }

  static async create({
    token,
    name,
    teacher_id,
  }: {
    token: string;
    name: string;
    teacher_id: number;
  }): Promise<ApiCallResponse<ClassesResponse>> {
    const apiURL = import.meta.env.VITE_API_URL;

    return apiManager.makeApiCall<ClassesResponse>({
      apiUrl: `${apiURL}/classes`,
      callType: ApiCallType.POST,
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      bodyType: BodyType.JSON,
      body: {
        name: name,
        teacher_id: teacher_id,
      },
    });
  }


  static async update({
    token,
    id,
    name,
    teacher_id,
  }: {
    token: string;
    id: number;
    name: string;
    teacher_id: number;
  }): Promise<ApiCallResponse<ClassesResponse>> {
    const apiURL = import.meta.env.VITE_API_URL;

    return apiManager.makeApiCall<ClassesResponse>({
      apiUrl: `${apiURL}/classes/${id}`,
      callType: ApiCallType.PUT,
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      bodyType: BodyType.JSON,
      body: {
        name: name,
        teacher_id: teacher_id,
      },
    });
  }


  static async delete({
    token,
    id,
  }: {
    token: string;
    id: number;
  }): Promise<ApiCallResponse<ClassesResponse>> {
    const apiURL = import.meta.env.VITE_API_URL;

    return apiManager.makeApiCall<ClassesResponse>({
      apiUrl: `${apiURL}/classes/${id}`,
      callType: ApiCallType.DELETE,
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });
  }
}