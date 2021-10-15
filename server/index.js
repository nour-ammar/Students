const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const studentsRoutes = require("./routes/api")


const app = express();

// middleware
app.use(bodyParser.json());
app.use(cors());

app.use("/",studentsRoutes);

// connect db
const mongodb_url = 'mongodb+srv://noor:noor@noor.dqjmz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
mongoose.connect(mongodb_url);
mongoose.connection.on('connected',()=>{
  console.log('***database is connected :)))))))***')
});

const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log('app listening on port 5000'));