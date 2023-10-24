const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Server is running on port 3000');
});

app.listen(3000, () => {
  console.log('Server on port 3000');
});

app.get('/about', (req, res) => {
  res.send('About page')
});

app.post('/contact', (req, res) => {
  res.send('Contact page')
});