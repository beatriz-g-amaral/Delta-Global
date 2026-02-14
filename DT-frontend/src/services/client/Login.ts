import { ApiCallResponse, ApiCallType, apiManager, BodyType } from '../ApiManager';

export interface LoginResponse {
  status: boolean;
  token: string;
  user: {
    id: number;
    name: string;
  };
}

export class LoginCall {
  static async call({
    email,
    password,
  }: {
    email: string
    password: string
  }): Promise<ApiCallResponse<LoginResponse>> {

    const apiURL = import.meta.env.VITE_API_URL;

    return apiManager.makeApiCall<LoginResponse>({
      apiUrl: `${apiURL}/login`,
      callType: ApiCallType.POST,
      bodyType: BodyType.JSON,
        body: {
          email,
          password,
        },
    })
  }
}
