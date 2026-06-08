const express = require("express");
const crypto = require("crypto");

const app = express();
app.use(express.json());

// database sementara (reset kalau redeploy)
let keys = [];

// generate key random
function generateKey() {
  return crypto.randomBytes(6).toString("hex");
}

// GET KEY
app.get("/get-key", (req, res) => {
  const key = generateKey();
  keys.push(key);

  res.json({
    success: true,
    key: key
  });
});

// VERIFY KEY
app.post("/verify", (req, res) => {
  const { key } = req.body;

  if (keys.includes(key)) {
    return res.json({
      success: true,
      message: "Key valid"
    });
  }

  return res.json({
    success: false,
    message: "Key invalid"
  });
});

// test root
app.get("/", (req, res) => {
  res.send("Key system aktif");
});

module.exports = app;
