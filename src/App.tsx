import "./App.css";
import { useState } from "react";

function App() {
  const [topic, setTopic] = useState<string>(""); // the topic that the user wants information of
  const [mentions, setMentions] = useState<number | null>(null); // the result of the fetching, the number of mentions of the current topic

  // function that handles the submission of the form, fetches data and calculates mentions
  const handleFetchMentions = async (e: React.FormEvent) => {
    e.preventDefault(); // makes page not refresh

    fetch(`http://localhost:8000/${topic}`)
      .then(response => response.json())
      .then(data => setMentions(data.mentions))
      .catch((error) => console.log(error))
  }

  // form with input and p that continuously update based on state variables
  return (
    <div className="form-container">
      <form onSubmit={handleFetchMentions}>
        <label htmlFor="topic-input">What topic do you want to get the amount for?</label>
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
