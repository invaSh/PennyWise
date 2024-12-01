const baseUrl = "http://localhost:6002/";

async function get(url) {
  const requestOptions = {
    method: "GET",
  };
  const response = await fetch(baseUrl + url, requestOptions);
  return await handleResponse(response);
}

async function post(url, body){
  const requestOptions= {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  }
  const response = await fetch(baseUrl + url, requestOptions);
  
  return handleResponse(response);
}

async function put(url, body){
  const requestOptions= {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body)
  }
  
  const response = await fetch(baseUrl + url, requestOptions);
  
  return handleResponse(response);
}

async function del(url){
  const requestOptions= {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  }
  
  const response = await fetch(baseUrl + url, requestOptions);
  
  return handleResponse(response);
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
  post,
  put,
  del
};
