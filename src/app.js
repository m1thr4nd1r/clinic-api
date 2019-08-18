const express = require('express');
const app = express();

//Rotas
const index = require('./routes/index');
const calendarRoute = require('./routes/scheduleRoute');
app.use(express.json())
app.use('/', index);
app.use('/schedule', calendarRoute);
module.exports = app;