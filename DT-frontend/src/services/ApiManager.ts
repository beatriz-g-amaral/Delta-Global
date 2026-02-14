export interface ApiCallResponse<T = unknown> {
    success: boolean
    data?: T
    error?: string
    statusCode?: number
  }
  
  export enum ApiCallType {
    GET = "GET",
    POST = "POST",
    PUT = "PUT",
    DELETE = "DELETE",
  }
  
  export enum BodyType {
    JSON = "application/json",
    MULTIPART = "multipart/form-data",
  }
  
  export interface ApiCallParams<B> {
    apiUrl: string
    callType: ApiCallType
    headers?: Record<string, string>
    params?: Record<string, string | number | boolean>
    body?: B
    bodyType?: BodyType
  }
  
type ConnectionErrorListener = () => void;

  class ApiManager {
    private static instance: ApiManager
    private connectionErrorListeners: ConnectionErrorListener[] = [];
  
    static getInstance(): ApiManager {
      if (!ApiManager.instance) {
        ApiManager.instance = new ApiManager()
      }
      return ApiManager.instance
    }
  
    public addConnectionErrorListener(listener: ConnectionErrorListener) {
      this.connectionErrorListeners.push(listener);
      return () => {
        this.connectionErrorListeners = this.connectionErrorListeners.filter((l) => l !== listener);
      };
    }

    private notifyConnectionError() {
      this.connectionErrorListeners.forEach((listener) => listener());
    }

    async makeApiCall<T = unknown, B = unknown>({
      apiUrl,
      callType,
      headers = {},
      params = {},
      body,
      bodyType,
    }: ApiCallParams<B>): Promise<ApiCallResponse<T>> {
      try {
        const url = new URL(apiUrl)
        if (callType === ApiCallType.GET && params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null && value !== "") {
              url.searchParams.append(key, String(value))
            }
          })
        }
  
        const token = localStorage.getItem('token');
        const authHeader = token ? { 'Authorization': `Bearer ${token}` } : {};

        const options: RequestInit = {
          method: callType,
          headers: {
            ...authHeader,
            ...headers,
          },
        }
  
        if (body && (callType === ApiCallType.POST || callType === ApiCallType.PUT)) {
          if (bodyType === BodyType.JSON) {
            options.headers = {
              ...options.headers,
              "Content-Type": "application/json",
            }
            options.body = JSON.stringify(body)
            }
          }
          else if (body && bodyType === BodyType.MULTIPART) {
            options.body = body as unknown as FormData
          }
  
        const response = await fetch(url.toString(), options)
        if (!response.ok) {
            let errorData;
            try {
                errorData = await response.json();
            } catch {
                const errorText = await response.text();
                return {
                    success: false,
                    error: errorText || "API call failed with non-JSON response",
                    statusCode: response.status,
                };
            }
            return {
                success: false,
                error: errorData.msg || errorData.error || "API call failed",
                statusCode: response.status,
                data: errorData,
            };
        }

        const data = await response.json();

        return {
            success: true,
            data,
            statusCode: response.status,
        };
      } catch (error) {
        this.notifyConnectionError();
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error occurred",
        }
      }
    }
  }
  
  export const apiManager = ApiManager.getInstance()