const port = 8000

const express = require('express')
require('dotenv').config()
const axios = require('axios')
const app = express()
const cors = require('cors')
app.use(cors())

app.listen(port, () => console.log(`Server is running on ${port}`))

app.get('/:topic', (req, res) => {
	const topic = req.params.topic;

	const options = {
		method: 'GET',
		url: `${process.env.TOPIC_API}${topic}`
	};

	axios.request(options).then((response) => {
		const text = response.data.parse.text["*"];
		const regex = new RegExp(topic, 'gi');

		res.json({
			topic: topic,
			mentions: (text.match(regex) || []).length
		});
	}).catch((error) => console.log(error));
})