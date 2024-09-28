const express = require('express');
const mongoose = require('mongoose');
const alarmRoutes = require('./routes/alarms');

require('dotenv').config();
const app = express();

//middleware
app.use(express.json());

// routes
app.use('/alarms', alarmRoutes);

app.get('/', (req, res) => {
    res.json({"msg":"hello world"});
})

//connect to db
const port = process.env.PORT || 3000;
console.log(process.env.MONG_URI);
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(port, () => {
            console.log(`Conncted to db and listening on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err)
    });




