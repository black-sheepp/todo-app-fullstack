// Import necessary modules
const express = require("express"); // Import the Express framework
const cors = require("cors"); // Import CORS middleware for cross-origin requests
const App = express(); // Create an Express application instance
const env = require("dotenv").config(); // Load environment variables from.env file
const port = 8080;
const db = require("./config/mongoose"); // Connect to the database using Mongoose
const bodyParser = require("body-parser"); 
const cookieParser = require("cookie-parser"); 

// Middleware setup
App.use(express.json()); // Parse JSON request bodies
App.use(bodyParser.json());

App.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies with extended mode
App.use(cookieParser()); // Parse cookies in incoming requests
App.use(cors()); // Enable CORS for cross-origin requests

// Routing setup
App.use("/", require("./routes/index")); // Uses the index route for the main application routing

// Starts the server
App.listen(port, () => console.log("TalkingDocs listening on port: " + port)); // Listen on the specified port and log a message 