const express = require("express");
const cors = require("cors");

const convertRoutes = require("./routes/convert.routes");
const app = express();

app.use(cors({
  origin: "*"
}));
app.use(express.json());


app.use("/api/convert", convertRoutes);
app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

app.get("/general/ping", (req, res) => {
  res.status(200).send("OK");
});