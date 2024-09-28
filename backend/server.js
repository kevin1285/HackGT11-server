const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

const alarmRoutes = require('./routes/alarms');
const userRoutes = require('./routes/users');


//middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

app.use(express.json());

// routes
app.use('/alarms', alarmRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.json({"msg":"hello world"});
})

//connect to db
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Conncted to db and listening on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err)
    });




