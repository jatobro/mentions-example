import { useState } from "react";
import { fetchMentions } from "../api/fetchMentions";

type Mentions = {
	topic: string
	count: number | null
}

export const useGetMentions = () => {
	const [mentions, setMentions] = useState<Mentions>({ topic: "", count: null });
	const [isLoading, setIsLoading] = useState(false);

	const getMentions = (topic: string) => {
		setIsLoading(true);
		fetchMentions(topic).then(setMentions).then(() => setIsLoading(false))
	}

	return { isLoading, mentions, getMentions};
}