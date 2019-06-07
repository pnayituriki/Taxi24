const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParse = require('body-parser');
const mongoose = require('mongoose');

const driversRoutes = require('./api/routes/drivers');
const ridersRoutes = require('./api/routes/riders');
const tripsRoutes = require('./api/routes/trips');

mongoose.connect('mongodb+srv://taxi24:taxi24@node-taxi24-api-sooir.mongodb.net/test?retryWrites=true&w=majority', {
        useNewUrlParser: true
    });

mongoose.Promise = global.Promise;

app.use(morgan('dev'));
app.use(bodyParse.urlencoded({extended: false}));
app.use(bodyParse.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Authorization'
    );
    if(req.method === 'OPTIONS') {
        res.header('Acces-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use('/drivers', driversRoutes);
app.use('/riders', ridersRoutes);
app.use('/trips', tripsRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;