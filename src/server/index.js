const fetch = require("node-fetch");

const PORT = 8081;

const dotenv = require("dotenv");
dotenv.config();
let path = require("path");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("dist"));

const BASE_API_URL = "https://api.meaningcloud.com/sentiment-2.1";
const MEAN_CLOUD_API_KEY = process.env.API_KEY;

app.get("/", function (req, res) {
  // res.sendFile('dist/index.html')
  res.sendFile(path.resolve("src/client/views/index.html"));
});


app.post("/sentiment", async function (req, res) {
  const url = req.body.url;
  const data = await fetch(`${BASE_API_URL}?key=${MEAN_CLOUD_API_KEY}&url=${url}&lang=en`);
  const json = await data.json();
  console.log(json);
  res.send(json);
});

app.get("/test", function (req, res) {
  res.send({
    title: "test json response",
    message: "this is a message",
    time: "now",
  });
});

// designates what port the app will listen to for incoming requests
app.listen(PORT, (error) => {
  if (error) throw new Error(error);
  console.log(`Server listening on port ${PORT}!`);
});

// TODO: export app to use it in the unit testing
