const Fetch = async (query, URL) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(query),
  };

  const res = await fetch(URL, options);
  const data = await res.json();

  return data;
};

export default Fetch;
