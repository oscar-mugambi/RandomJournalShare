import { customFetch } from '@/api/customFetch';

export async function loginUser(
  endpoint: string,
  requestBody: { email: string; password: string }
) {
  try {
    const response = await customFetch(endpoint, {
      method: 'POST',
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('Failed to login');
    }

    return response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

export async function logoutUser(endpoint: string, user_id: number, token?: string) {
  try {
    const response = await customFetch(
      endpoint,
      {
        method: 'POST',
        body: JSON.stringify({ user_id }),
      },
      token
    );

    // check if there is a response
    // temp hack to fix cookie related bug in development
    const text = await response.text();
    let data;
    if (text) {
      data = JSON.parse(text);
      console.log(data);
    }

    return data || {};
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
}

export async function registerUser(
  url: string,
  requestBody: { username: string; email: string; password: string }
) {
  const response = await customFetch(url, {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });

  if (!response.ok) {
    let errorMessage = 'Network response was not ok';
    try {
      const errorBody = await response.json();
      errorMessage = errorBody.error || errorBody.message || errorMessage;
    } catch (error) {
      console.error('Error parsing JSON response:', error);
    }
    throw new Error(errorMessage);
  }

  return response.json();
}
