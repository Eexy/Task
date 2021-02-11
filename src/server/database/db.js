const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(`mongodb+srv://taskapp:${process.env.CLUSTER}@kha.1znlw.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});
