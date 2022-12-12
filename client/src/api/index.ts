export const getData = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  const json = await res.json();
  console.log(json);
  return json;
};

export const postData = async <T>(url: string, body: object): Promise<T> => {
  const res = await fetch(url, {
    method: 'Post',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  console.log(json);
  return json;
};
