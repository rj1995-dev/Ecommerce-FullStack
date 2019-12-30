const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");
const morgan = require("morgan");
const cors = require("cors");
// const path = require("path");
// const config = require("config");

//app
const app = express();

//Require router
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const braintreeRoute = require("./routes/braintree");
//require .env file
require("dotenv").config();
//Load Keys
const keys = require("./config/keys");
//Map global promises
mongoose.Promise = global.Promise;

//Connect to mongoose
mongoose
  .connect(keys.mongoURI, {
    // useMongoClient: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log("MongoDB Connected...."))
  .catch(err => console.log(err));

//middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//route middleware
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", braintreeRoute);
//Server static assets if in production
// if (process.env.NODE_ENV === "production") {
//   //Set static folder
//   app.use(express.static("client/build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }
//Create Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
