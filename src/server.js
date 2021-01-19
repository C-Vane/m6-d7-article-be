const express = require("express");
const cors = require("cors");
const services = require("./services/index.js");
const listEndpoints = require("express-list-endpoints");
const { notFoundHandler, badRequestHandler, genericErrorHandler } = require("./utilities/errorHandlers");
const PORT = process.env.PORT || 3001;

const server = express();
server.use(express.json());
server.use(cors());

//SERVICES
server.use("/middle", services);

// ERROR HANDLERS MIDDLEWARES

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

console.log(listEndpoints(server));

server.listen(PORT, () => {
  console.log("Running on port", PORT);
});
server.on("error", (error) => {
  console.log("Error Occured", error);
});
