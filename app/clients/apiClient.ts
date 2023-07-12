// Define a generic type that can be used to infer the type of the response data
interface FetchOptions {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: Record<string, string>;
  body?: string | FormData;
}

// Define a helper function for performing fetch operations
export async function fetchApi<T>(url: string, options: FetchOptions): Promise<T> {
  const response = await fetch(url, options); 

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data: T = await response.json();

  return data;
}

// Define a client that uses the fetchApi function
class ApiClient {
  private baseUrl: string;
  private authToken?: string | null;

  constructor(baseUrl: string){
    this.baseUrl = baseUrl;
  }

  setAuthToken(token: string) {
    this.authToken = token;
  }

  private getHeaders(isPublic: boolean = false) {
    let headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.authToken && !isPublic) {
      headers = {
        ...headers,
        Authorization: `Bearer ${this.authToken}`,
      };
    }

    return headers;
  }

  async get<T>(path: string, isPublic: boolean = false): Promise<T> {
    debugger
    return fetchApi<T>(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers: this.getHeaders(isPublic),
    });
  }

  async post<T>(path: string, body: object, isPublic: boolean = false): Promise<T> {
    return fetchApi<T>(`${this.baseUrl}${path}`, {
      method: 'POST',
      headers: this.getHeaders(isPublic),
      body: JSON.stringify(body),
    });
  }

  async put<T>(path: string, body: object, isPublic: boolean = false): Promise<T> {
    return fetchApi<T>(`${this.baseUrl}${path}`, {
      method: 'PUT',
      headers: this.getHeaders(isPublic),
      body: JSON.stringify(body),
    });
  }

  async delete<T>(path: string, isPublic: boolean = false): Promise<T> {
    return fetchApi<T>(`${this.baseUrl}${path}`, {
      method: 'DELETE',
      headers: this.getHeaders(isPublic),
    });
  }
}

export default ApiClient;
