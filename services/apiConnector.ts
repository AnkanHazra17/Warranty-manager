type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface RequestOptions {
    method?: RequestMethod; // HTTP method (optional, defaults to GET)
    data?: Record<string, any> | null; // Payload for POST/PUT requests
    headers?: Record<string, string>; // Optional custom headers
    credentials?: RequestCredentials;
}

export async function apiConnector<T>(
    url: string,
    options: RequestOptions = {}
): Promise<Response> {
    const {
        method = 'GET', // Default method is GET
        data = null,
        headers = {},
        credentials = 'include',
    } = options;

    const defaultHeaders: Record<string, string> = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...headers, // Merge default headers with custom headers
    };

    const fetchOptions: RequestInit = {
        method,
        headers: defaultHeaders,
        credentials,
    };

    // Add body if data is provided and method is not GET
    if (data && method !== 'GET') {
        fetchOptions.body = JSON.stringify(data);
    }

    try {
        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        if(response.redirected){
            console.error("Redirect detected:", response.url);
        }

        return response;
    } catch (error) {
        console.error('Request Error:', error);
        throw error; // Re-throw the error for further handling
    }
}
