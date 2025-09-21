// src/shared/services/http.ts
// We define the base URL of our local API.
const API_BASE_URL = "http://127.0.0.1:8080";

/**
 * A generic and reusable function to make fetch requests to our API.
 * Encapsulates the base URL logic, HTTP error handling and JSON parsing.
 *
 * @param endpoint - The endpoint route to call (e.g: '/services').
 * @param options - Configuration options for fetch (method, body, headers, etc.).
 * @returns A promise that resolves with the response data in JSON format.
 * @throws Throws an error if the network response is not 'ok' (e.g: status 404 or 500).
 */
export async function fetcher<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    // We can define default values for options here
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  // If the response is not successful (status code is not in the 200-299 range),
  // we throw an error so it can be caught by our components.
  if (!response.ok) {
    const errorInfo = await response.json().catch(() => ({}));
    throw new Error(
      errorInfo.detail ||
        `Request error: ${response.status} ${response.statusText}`
    );
  }

  // If the response is successful, we parse it as JSON.
  return response.json() as Promise<T>;
}