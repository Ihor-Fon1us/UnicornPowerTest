const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const indexRouter = require('./routes/index');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);

// error handler
app.use(function (error, req, res, next) {
    res.json({
      success: false,
      message: error.message,
      fails: error.fails,
    });
  });

module.exports = app;
