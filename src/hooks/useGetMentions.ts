import { useState } from "react";
import { fetchMentions } from "../api/fetchMentions";

type Mentions = {
  topic: string;
  count: number;
};

export const useGetMentions = () => {
  const [mentions, setMentions] = useState<Mentions>();
  const [isLoading, setIsLoading] = useState(false);

  const getMentions = (topic: string) => {
    setIsLoading(true);
    fetchMentions(topic)
      .then(setMentions)
      .then(() => setIsLoading(false));
  };

  return { isLoading, mentions, getMentions };
};
