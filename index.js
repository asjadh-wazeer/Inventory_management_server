const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const { ObjectId } = require("mongodb");
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());

const port = 5000;

const uri = "mongodb+srv://devSquad:<password>@cluster0.133bl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

app.get("/", (req, res) => {
    res.send("Hello!!!");
  });

  app.listen(process.env.PORT || port);
