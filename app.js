require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/error-handler');
const NotFoundError = require("./errors/NotFoundError");

const { PORT = 3000, DB = 'mongodb://localhost:27017/bitfilmsdb', NODE_ENV } = process.env;

const app = express();
mongoose.connect(NODE_ENV === 'production' ? DB : 'mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(requestLogger);

app.use(require('./routes/index'));

app.use((res, req, next) => {
  next(new NotFoundError('Страницы не существует'));
});

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Application is running on port ${PORT}`);
});
