const express = require("express");
const app = express();

app.use(express.json());

app.listen(8000, () => {
  console.log("Gateway is running on Port 8000");
});