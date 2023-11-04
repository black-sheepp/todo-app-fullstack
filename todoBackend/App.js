
const express = require("express"); 
const cors = require("cors"); 
const App = express(); 
const env = require("dotenv").config(); // Load environment variables from.env file
const port = 8080;
const db = require("./config/mongoose"); 
const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser"); 

// Middleware setup
App.use(express.json()); 
App.use(bodyParser.json());

App.use(bodyParser.urlencoded({ extended: true })); 
App.use(cookieParser()); 
App.use(cors()); 

// Routing setup
App.use("/", require("./routes/index")); 

// Starts the server
App.listen(port, () => console.log("TalkingDocs listening on port: " + port)); // Listen on the specified port and log a message 
