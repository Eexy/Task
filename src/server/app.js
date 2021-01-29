const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// path to public directory
const publicDirectory = path.join(__dirname, '../public');
console.log(publicDirectory);

// configure public file
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
  res.sendFile(path.join(publicDirectory, 'pages/index.html'));
});

app.listen(PORT, () => {
  console.log(`listening port: ${PORT}`);
});
