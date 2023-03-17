const express = require("express");
const app = express();
var cors = require("cors");
app.use(cors());
const userRoute = require("./routers/user.route");
const paymentRoute = require("./routers/payment");
require("dotenv").config();
const https = require("https");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Use this after the variable declaration
// app.use((req,res,next)=> {
//     res.setHeader('Access-Control-Allow-Origin','*') /// anehom websites ili ynajmou youslolou ll server met3k
//     res.setHeader('Access-Control-Request-Method','*')//chkoun ynajem yousel ll http method
//     res.setHeader('Acces-Control-Allow-Headers','*')
//     res.setHeader('Access-Control-Request-Headers', '*')//chnowa header ili tnajem tb3thom
//     next( )
//   })
const fs = require("fs");
const options = {
  key: fs.readFileSync("./key.pem"),
  cert: fs.readFileSync("./cert.pem"),
};
// const httpsServer = https.createServer(options, app);

app.use("/", userRoute);
app.use("/api", paymentRoute);
app.get("/hello", async (req, res) => {
  res.send("helloworld");
});

app.listen(process.env.PORT);
// const port = 5000; // HTTPS default port

// httpsServer.listen(port, () => {
//   console.log(`HTTPS server listening on port ${port}`);
// });
