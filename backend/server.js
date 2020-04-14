const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Configure .env file support in root of app
require('dotenv').config();

// Configure Express

const app = express();
const port = process.env.port || 5000;

// Configure CORS

var whitelist = ['http://localhost:3000','http://localhost:5000']

var corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true)
      } else {
        callback(new Error('Not allowed by CORS'))
      }
    }
  }

app.use(cors(corsOptions));

// Configure MongoDB Connection

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('The Mongo DB has mounted successfully!');
});

// Configure Routers

const lookupRouter = require('./routes/lookup');
//const historicalRouter = require('./routes/historical');

app.use('/lookup', lookupRouter);
//app.use('/historical', historicalRouter);

// App Listen!

app.listen(port, () => {
    console.log(`The server is listening on port: ${port}`);
});