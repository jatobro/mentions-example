export const fetchMentions = async (topic: string) => {
  const response = await fetch(`/api/mentions/${topic}`);
  return await response.json();
};
