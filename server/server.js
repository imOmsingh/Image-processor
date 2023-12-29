const express = require('express');
const ImageRouter = require('./routes/image');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use('/images', express.static('images'));

app.use('/api/image', ImageRouter);

 //connection
 const connection = mongoose
 .connect(
  //  "mongodb+srv://holidayscrowd:holidayscrowd@holidayscrowd.x4svn.mongodb.net/?retryWrites=true&w=majority"
  // "mongodb+srv://user1234:78MB207hbeh77eoA@cluster0.fb8kkpv.mongodb.net/?retryWrites=true&w=majority"
  "mongodb+srv://omsingh200310:VxfZagUFbwfyu4TR@cluster0.6mb9i4s.mongodb.net/?retryWrites=true&w=majority"
 )
 .then(console.log("Database Connected"))
 .catch((err) => {
   console.log(err);
 });
if (!connection) {
 return "Could not connect to server";
}



app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});