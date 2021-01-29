const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();
const PORT = 3000;

// set views and partials path
const viewsPath = path.join(__dirname, '../public/views');

// set template engine
app.engine('.hbs', hbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', viewsPath);

// set path to public directory
const publicDirectory = path.join(__dirname, '../public');

// configure public file
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
  res.render('index', { title: 'homepage' });
});

app.listen(PORT, () => {
  console.log(`listening port: ${PORT}`);
});
