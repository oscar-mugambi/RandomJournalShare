interface CustomFetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  credentials?: 'include' | 'omit' | 'same-origin';
}

export function customFetch(endpoint: string, options: CustomFetchOptions = {}, token?: string) {
  const defaultHeaders = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  const BASE_URL =
    process.env.NODE_ENV === 'production' ? 'https://cosmicpenguin.xyz' : 'http://localhost:5000';
  const url = `${BASE_URL}${endpoint}`;

  return fetch(url, config);
}
