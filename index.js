const express = require("express");
// const dotenv = require("dotenv");
// dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: "Hello World" });
});

app.listen(port, () => {
  console.log(`server is running on port 3000 `);
});
