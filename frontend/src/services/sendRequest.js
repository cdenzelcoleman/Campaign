const sendRequest = async (endpoint, method = 'GET', data = null, token = null) => {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
  };

  if (data) {
    config.body = JSON.stringify(data);
  }

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`/api/${endpoint}`, config);
  const responseData = await response.json();

  if (!response.ok) {
    const error = responseData.message || 'Something went wrong!';
    throw new Error(error);
  }

  return responseData;
};

export default sendRequest;