const mongoose = require("mongoose");
const env = require("dotenv").config();

const {username,password} = process.env;

const db = mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.7nomgdw.mongodb.net/todo?retryWrites=true&w=majority`).then(() => console.log("Connected DB!"));

module.exports = db;