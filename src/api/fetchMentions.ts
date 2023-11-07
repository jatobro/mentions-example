const BASE_URL = process.env.REACT_APP_EXPRESS_API_URL;

export const fetchMentions = (topic: string) => {
  return fetch(`${BASE_URL}/mentions/${topic}`).then((response) =>
    response.json()
  );
};
