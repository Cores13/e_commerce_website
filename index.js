require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRouter");
const categoryRouter = require("./routes/categoryRouter");
const productRouter = require("./routes/productRouter");
const paymentRouter = require("./routes/paymentRouter");
const upload = require("./routes/upload");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// Connect to MongoDB
const URI = process.env.MONGODB_URL;
mongoose.connect(
  URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) throw error;
    console.log("Connected to MongoDB");
  }
);

// Routes
app.use("/user", userRouter);
app.use("/api", paymentRouter);
app.use("/api", categoryRouter);
app.use("/api", upload);
app.use("/api", productRouter);

// Start a server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is runing on port ", PORT);
});
