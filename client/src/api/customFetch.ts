interface CustomFetchOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: string;
  credentials?: 'include' | 'omit' | 'same-origin';
}
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? 'https://cosmicpenguin.xyz/api'
    : 'http://localhost:5000/api';

async function refreshToken() {
  const response = await fetch(`${BASE_URL}/auth/refresh`, {
    method: 'GET',
    credentials: 'include',
  });
  const data = await response.json();
  return data.accessToken;
}

export async function customFetch(
  endpoint: string,
  options: CustomFetchOptions = {},
  token?: string
) {
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

  const url = `${BASE_URL}${endpoint}`;

  let response = await fetch(url, config);

  if (response.status === 403) {
    const accessToken = await refreshToken();
    if (accessToken) {
      const newConfig = {
        ...config,
        headers: {
          ...defaultHeaders,
          Authorization: `Bearer ${accessToken}`,
        },
      };
      response = await fetch(url, newConfig);
    } else {
      window.location.href = '/auth/login';
    }
  }

  return response;
}
