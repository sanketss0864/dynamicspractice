const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");
const tokenGenerator=require("./handler");
const cors = require('cors');
const router = require("./router");
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api', router);
const server = http.createServer(app);
const port = process.env.PORT || 3001;
server.listen(port, function () {
  console.log("Express server running on *:" + port);
});
app.get("/token", async (req, res) => {
  
  try {
    const token = await tokenGenerator.tokenGenerator(); 
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate token" });
  }
});