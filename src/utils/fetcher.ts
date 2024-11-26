export const fetcherWithHeaders = async (
  url: string,
  method: string = "GET",
  body?: unknown
) => {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("id_token")}`,
  };

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);

  if (!res.ok) {
    const error = new Error("Failed to fetch");
    error.message = await res.text();
    throw error;
  }

  return res.json();
};
