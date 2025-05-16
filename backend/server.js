const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
  });
app.use("/api/timeline", require("./routes/timeLine"));   
app.use("/authRoute", require("./routes/authRoute"));
//app.use("/api/registration", require("./routes/registrationRoutes"));
app.use("/api/signnow", require("./routes/signNowRoutes"));  
app.use("/api/video", require("./routes/videoVerification"));   
app.listen(5000, () => console.log("Server running on port 5000"));
