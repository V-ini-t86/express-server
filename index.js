const express = require("express");
const nodemailer = require("nodemailer");
const cors = use("cors");
// const dotenv = require("dotenv");
// dotenv.config();
const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
  );
  next();
});

app.get("/", (req, res) => {
  res.json({ success: "Hello World" });
});
let transport = {
  host: "smtp.mailtrap.io",
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
};

let transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("All works fine");
  }
});
app.post("/send", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  let mail = {
    from: email,
    to: email,
    subject: `Contact form request ${name}`,

    html: message,
  };
  console.log(mail);
  transporter.sendMail(mail, (err, data) => {
    if (err) {
      res.json({ msg: "fail" });
    } else {
      res.json({ msg: "success" });
    }
  });
});
app.listen(port, () => {
  console.log(`server is running on port ${port} `);
});
