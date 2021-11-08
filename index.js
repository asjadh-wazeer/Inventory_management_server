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
  const categoryCollection = client.db("inventoryManagement").collection("categories");
  const storeCollection = client.db("inventoryManagement").collection("stores");
  const attributeCollection = client.db("inventoryManagement").collection("attribute");

  //adding brands
  app.post("/brands", (req, res) => {
    const brand = req.body;
    console.log(brand);
    brandCollection.insertOne(brand)
    .then((result) => {
      res.send(result.insertedCount > 0);
    })
  });

  //adding categories
  app.post("/categories", (req, res) => {
    const category = req.body;
    console.log(category);
    categoryCollection.insertOne(category)
    .then((result) => {
      res.send(result.insertedCount > 0);
    })
  })

  //adding stores
  app.post("/stores", (req, res) => {
    const store = req.body;
    console.log(store);
    store.createdAt = new Date();
    store.updatedAt = new Date();
    storeCollection.insertOne(store)
    .then((result) => {
      res.send(result.insertedCount > 0);
    })
  })

  //adding attributes
  app.post("/attributes", (req, res) => {
    const attribute = req.body;
    console.log(attribute);
    attributeCollection.insertOne(attribute)
    .then((result) => {
      res.send(result.insertedCount > 0);
    })
  })



});

// console.log(process.env.DB_NAME);

app.get("/", (req, res) => {
    res.send("Hello inventory management system!!!");
  });

  app.listen(process.env.PORT || port);
