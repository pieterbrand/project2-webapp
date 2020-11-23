const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
//var corsOptions = {origin: "https://pieterproject2.herokuapp.com/"};

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


const uri = "mongodb+srv://admin:AxCGZEcHFqJJZ0jA@cluster1.yui3f.mongodb.net/UsersDB?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true,useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {console.log("DB connected")})
//connection.close();
connection.once('close', () => {console.log("DB closed")})

const userRouter = require('./routes/users');
app.use('/users',userRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
  });


