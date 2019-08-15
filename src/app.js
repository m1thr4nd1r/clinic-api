const express = require('express');
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');

//Rotas
const index = require('./routes/index');
const calendarRoute = require('./routes/calendarRoute');
//app.use(bodyParser);
app.use(express.json())
app.use('/', index);
app.use('/schedule', calendarRoute);
module.exports = app;

// const express = require('express');
// const app = express();
// const router = express.Router();
// //Rotas
// const index = require('./routes/index');
// const personRoute = require('./routes/personRoute');
// app.use('/', index);
// app.use('/persons', personRoute);
// module.exports = app;