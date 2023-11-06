import "./App.css";
import { useState } from "react";

function App() {
  const [topic, setTopic] = useState<string>(""); // the topic that the user wants information of
  const [mentions, setMentions] = useState<number | null>(null); // the result of the fetching, the number of mentions of the current topic

  // function that fetches from the wikipedia API and returns number of times 'topic' was mentioned in the text
  const getTopicMentionCount = async (topic: string) => {
    return fetch(`https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=parse&section=0&prop=text&format=json&page=${topic}`)
      .then(response => response.json())
      .then(data => {
        const text = data.parse.text['*'];
        const regex = new RegExp(topic, 'gi');

        const mentions = (text.match(regex) || []).length;
        console.log(`Topic was mentioned ${mentions} times`);

        return mentions;
      })
      .catch((error) => console.log(error))
  }

  // function that handles the submission of the form, sets mentions value by calling fetching function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const mentions = await getTopicMentionCount(topic);
    setMentions(mentions);
  }

  // form with input and p that continuously update based on state variables
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          What topic do you want to get the amount for?
          <input type="text" name="topic" value={topic} onChange={(e) => setTopic(e.target.value)} />
        </label>
        <button type="submit">Get amount</button>

      </form>
      <p>{mentions ?? ""}</p>
    </div>

  );
}

export default App;
