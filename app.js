const mongoose = require("mongoose").default;
const express = require("express");
require("dotenv").config();
const chalk = require("chalk");

const { Product, Contact } = require("./models");

const errorMsg = chalk.bgKeyword("white").redBright;
const successMsg = chalk.bgKeyword("green").whiteBright;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(successMsg("connected"));
  })
  .catch((error) => error);


const app = express();

app.use(express.json());

app.get("/api/products", (req, res) => {
  Product.find({})
    .then((products) => res.status(200).json(products))
    .catch((error) => res.status(500).json(error));
});

app.get("/api/product/:id", (req, res) => {
  const { id } = req.params;

  Product.findById(id)
    .then((products) => res.status(200).json(products))
    .catch((error) => res.status(500).json(error));
});

app.delete("/api/products/:id", async (req, res) => {
  const { id } = req.body;

  Product.findByIdAndDelete(id)
    .then((product) => res.status(200).json(product))
    .catch((error) => res.status(500).json(error));
});

app.put("/api/products/:id", async (req, res) => {
  const { id } = req.params;
  const { price, name } = req.body;

  Product.findByIdAndUpdate(id, { price, name }, { new: true })
    .then((product) => res.status(200).json(product))
    .catch((error) => res.status(500).json(error));
});

app.post("/api/products", async (req, res) => {
  const { name, location, price } = req.body;
  const product = Product({ name, price, location });

  product
    .save()
    .then((product) => res.status(200).json(product))
    .catch((error) => res.status(500).json(error));
});

app.get("/api/contacts", (req, res) => {
  Contact.find({})
    .then((contact) => res.status(200).json(contact))
    .catch((error) => res.status(500).json(error));
});

app.listen(process.env.PORT, (error) => {
  error
    ? console.log(errorMsg(error))
    : console.log(successMsg(`Listen port:${process.env.PORT}`));
});
