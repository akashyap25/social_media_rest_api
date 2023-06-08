const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const helmet= require("helmet");
const morgan = require("morgan");
const app = express();
const userRoute= require("./routes/users");
const authRoute= require("./routes/auth");
const postRoute = require("./routes/posts");
dotenv.config();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log('Connected Successfully'))

.catch((err) => { console.error(err); });


//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // bodyparser --parses the request to json format
app.use(helmet());
app.use(morgan("common"));

//to connect the user in router , router is used as in big application routing in 
// main page makes the code difficult to maintain
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

app.get("/", (req, res)=>{
    res.send("Welcome to sociometa");
})


app.listen(3300, function(){
    console.log(`server running on port 3300`);
    });