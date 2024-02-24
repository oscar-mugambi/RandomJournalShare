export async function loginUser(url: string, requestBody: { email: string; password: string }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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

export async function registerUser(
  url: string,
  requestBody: { username: string; email: string; password: string }
) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
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
