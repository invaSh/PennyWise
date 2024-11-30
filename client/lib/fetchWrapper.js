const baseUrl = "http://localhost:6002/";

async function get(url) {
  const requestOptions = {
    method: "GET",
  };
  const response = await fetch(baseUrl + url, requestOptions);

  return await handleResponse(response);
}

async function handleResponse(response) {
    const text = await response.text();
  
    let data;
    try {
      data = JSON.parse(text);
    } catch (error) {
      data = text;
    }
  
    if (response.ok) {
      return data;
    } else {
      const error = {
        status: response.status,
        message: data || response.statusText,
        url: response.url,
        headers: response.headers,
      };
      return { error };
    }
  }
  

export const fetchWrapper = {
  get,
};
