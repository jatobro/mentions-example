import express from "express";
import cors from "cors";
import { request } from "axios";

const app = express();
app.use(cors());

require("dotenv").config();

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server is running on ${port}`));

app.get("/api/mentions/:topic", (req, res) => {
  const topic = req.params.topic;

  const options = {
    method: "GET",
    url: `${process.env.WIKI_TOPIC_API}${topic}`,
  };

  request(options)
    .then((response) => {
      const text = response.data.parse.text["*"];
      const regex = new RegExp(topic, "gi");

      res.json({
        topic: topic,
        count: (text.match(regex) || []).length,
      });
    })
    .catch((error) => console.log(error));
});
