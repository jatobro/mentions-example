import "./App.css";
import { useState } from "react";

function App() {
  const [topic, setTopic] = useState("");
  const [mentions, setMentions] = useState<number | null>(null);

  const handleFetchMentions = async (e: React.FormEvent) => {
    e.preventDefault();

    fetch(`http://localhost:8000/mentions/${topic}`)
      .then(response => response.json())
      .then(data => setMentions(data.mentions))
      .catch((error) => console.log(error))
  }

  return (
    <div className="form-container">
      <form onSubmit={handleFetchMentions}>
        <label htmlFor="topic-input">What topic do you want to get the amount of mentions for?</label>
        <input id="topic-input" type="text" name="topic" value={topic} onChange={(e) => {
          setTopic(e.target.value);
          setMentions(null);
        }
        } />
        <button type="submit">Get amount</button>
      </form>
      <p>{mentions ?? ""}</p>
    </div>
  );
}

export default App;
