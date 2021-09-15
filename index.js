const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const pino = require("express-pino-logger")();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(pino);
app.use(cors());

var allowlist = ["http://localhost:3000", "https://toy-web-app.herokuapp.com"];
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

// Set up mongoose connection url
const mongoose = require("mongoose");
let dev_db_url =
  "mongodb+srv://sachie:sachie@026@toy-app.kglf1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Set up mongoose db connection
let mongoDB = process.env.MONGODB_URI || dev_db_url;
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});
mongoose.Promise = global.Promise;

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//Adding route for different module
const roomRoutes = require("./routes/rooms.routes");
app.use("/v1/", cors(corsOptionsDelegate), roomRoutes);

const metricRoutes = require("./routes/metrics.routes");
app.use("/v1/", cors(corsOptionsDelegate), metricRoutes);

app.listen(PORT, () =>
  console.log("Express server is running on localhost:5000")
);
