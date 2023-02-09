// create an Express app
const express = require('express');
const app = express();

// create a route for the app
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// make the server listen to requests
app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
// create an Express app