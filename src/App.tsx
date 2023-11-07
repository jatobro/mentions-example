import "./App.css";
import { useState } from "react";
import { useGetMentions } from "./hooks/useGetMentions";

function App() {
  const [topic, setTopic] = useState("");
  const { isLoading, mentions, getMentions } = useGetMentions();

  const handleFetchMentions = (e: React.FormEvent) => {
    e.preventDefault();
    getMentions(topic);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleFetchMentions}>
        <label htmlFor="topic-input">
          What topic do you want to get the amount of mentions for?
        </label>
        <input
          id="topic-input"
          type="text"
          name="topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button type="submit">Get mentions</button>
      </form>
      {isLoading ? <p>Loading...</p> : <p>{mentions.count ?? ""}</p>}
    </div>
  );
}

export default App;
