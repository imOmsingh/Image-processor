const express = require('express');
const ImageRouter = require('./routes/image');
const app = express();
const cors = require('cors');
const bodyParser = require("body-parser");
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


app.get('/', (req, res) => {
  res.send('Welcome to my server!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});