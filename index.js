const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const foodModal = require("./modals/food");
const accountRoute = require("./routes/account");
const foodRoute = require("./routes/food");
const userRoutes = require("./routes/user");
const cors = require("cors");

const server = express();
// const handleError = (req,res,next)=>{
//     console.log("Error page executed");
//     next();
// }

server.use(bodyParser.json());
server.use(cors());

server.use(accountRoute);
server.use(foodRoute);
server.use(userRoutes);
//server.get("*",handleError,(req,res)=>{res.send("404 page")})


mongoose.connect("mongodb+srv://foodShop:112233445566778899@cluster0.6e8egnx.mongodb.net/?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true}).then(result => {

    server.listen(8082, "localhost",()=>{console.log("server is ready")});
}).catch(err=> console.log(err));