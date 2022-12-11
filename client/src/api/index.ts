export const getData = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  const json = await res.json();
  console.log(json);
  return json;
};
