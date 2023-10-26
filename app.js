var express = require('express');
var path = require('path');

var indexRouter = require('./routes/index')
var taskRouter = require("./routes/task")

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', indexRouter)
app.use("/api/task", taskRouter)

module.exports = app;
