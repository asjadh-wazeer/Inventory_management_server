const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
require("dotenv").config();
app.use(bodyParser.json());
app.use(cors());

const port = 8000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.133bl.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const brandCollection = client.db("inventoryManagement").collection("brands");
  const categoryCollection = client
    .db("inventoryManagement")
    .collection("categories");
  const storeCollection = client.db("inventoryManagement").collection("stores");
  const attributeCollection = client
    .db("inventoryManagement")
    .collection("attribute");
  const productCollection = client.db("inventoryManagement").collection("products");
  const orderCollection = client.db("inventoryManagement").collection("orders");

  //adding brands
  app.post("/addBrand", (req, res) => {
    const brand = req.body;
    console.log(brand);
    brandCollection.insertOne(brand).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  //reading brands
  app.get("/getBrands", (req, res) => {
    brandCollection.find({}).toArray((err, documents) => {
      res.send(documents);
      console.log(err);
    });
  });

  //adding categories
  app.post("/categories", (req, res) => {
    const category = req.body;
    console.log(category);
    categoryCollection.insertOne(category).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  //reading categories
  app.get("/getCategories", (req, res) => {
    categoryCollection.find({}).toArray((err, documents) => {
      res.send(documents);
      console.log(err);
    });
  });

  //adding stores
  app.post("/stores", (req, res) => {
    const store = req.body;
    console.log(store);
    store.createdAt = new Date();
    store.updatedAt = new Date();
    storeCollection.insertOne(store).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  //reading stores
  app.get("/getStores", (req, res) => {
    storeCollection.find({}).toArray((err, documents) => {
      res.send(documents);
      console.log(err);
    });
  });

  //adding attributes
  app.post("/attributes", (req, res) => {
    const attribute = req.body;
    console.log(attribute);
    attributeCollection.insertOne(attribute).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });

  //reading attributes
  app.get("/getAttributes", (req, res) => {
    attributeCollection.find({}).toArray((err, documents) => {
      res.send(documents);
      console.log(err);
    });
  });

  //adding products
  app.post("/addProduct", (req, res) => {
    const product = req.body;
    console.log(product);
    product.createdAt = new Date();
    product.updatedAt = new Date();
    productCollection.insertOne(product).then((result) => {
      res.send(result.insertedCount > 0);
    });
  })

  //reading products
  app.get("/getProducts", (req, res) => {
    productCollection.find({}).toArray((err, documents) => {
      res.send(documents);
      console.log(err);
    });
  })

  //adding orders
  app.post("/addOrder", (req, res) => {
    const order = req.body;
    console.log(order);
    order.createdAt = new Date();
    order.updatedAt = new Date();
    orderCollection.insertOne(order).then((result) => {
      res.send(result.insertedCount > 0);
    });
  })

  //reading orders
  app.get("/getOrders", (req, res) => {
    orderCollection.find({}).toArray((err, documents) => {
      res.send(documents);
      console.log(err);
    });
  })

  

  // delete specific brand from database
  app.delete("/deleteBrand/:id", (req, res) => {
    brandCollection
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        // console.log(result.deletedCount)
        res.send(result.deletedCount > 0);
      });
  });

  // delete specific collection from database
  app.delete("/deleteCategory/:id", (req, res) => {
    categoryCollection
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        // console.log(result.deletedCount)
        res.send(result.deletedCount > 0);
      });
  })

  // delete specific store from database
  app.delete("/deleteStore/:id", (req, res) => {
    storeCollection
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        // console.log(result.deletedCount)
        res.send(result.deletedCount > 0);
      });
  })

  // delete specific attribute from database
  app.delete("/deleteAttribute/:id", (req, res) => {
    attributeCollection
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((result) => {
        // console.log(result.deletedCount)
        res.send(result.deletedCount > 0);
      });
  })

  // delete specific product from database
  app.delete("/deleteProduct/:id", (req, res) => {
    productCollection.deleteOne({ _id: ObjectId(req.params.id) })
    .then((result) => {
      // console.log(result.deletedCount)
      res.send(result.deletedCount > 0);
    })
  })


});

app.get("/", (req, res) => {
  res.send("Hello!!!");
});

app.listen(process.env.PORT || port);
