const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const userRouter = require('./routers/user');
const taskRouter = require('./routers/tasks');

// connect to the database
require('./database/db');

const app = express();
const PORT = 3000;

// set views and partials path
const viewsPath = path.join(__dirname, '../public/views');

// set template engine
app.engine('.hbs', hbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', viewsPath);

// configure public directory
const publicDirectory = path.join(__dirname, '../public');
app.use(express.static(publicDirectory));

app.use(express.urlencoded({ extended: true }));

// configure routers
app.use(userRouter);
app.use(taskRouter);

app.get('', (req, res) => {
  res.send('<h1>Hellow world</h1>');
});

app.listen(PORT, () => {
  console.log(`listening port: ${PORT}`);
});
