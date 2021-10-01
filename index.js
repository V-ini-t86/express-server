const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ success: "Hello World" });
});

app.listen(3000 || process.env.PORT, () => {
  console.log(`server is running on port 3000 `);
});
