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

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.suylw.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const brandCollection = client.db("inventoryManagement").collection("brands");

  //adding brands
  app.post("/brands", (req, res) => {
    const brand = req.body;
    console.log(brand);
    brandCollection.insertOne(brand)
    .then((result) => {
      res.send(result.insertedCount > 0);
    })
  });
});

app.get("/", (req, res) => {
    res.send("Hello!!!");
  });

  app.listen(process.env.PORT || port);
