const BASE_URL = process.env.REACT_APP_EXPRESS_API_URL;

export const fetchMentions = async (topic: string) => {
  const response = await fetch(`${BASE_URL}/mentions/${topic}`);
  return await response.json();
};
