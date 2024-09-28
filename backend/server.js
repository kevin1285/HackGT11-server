const express = require('express');
const mongoose = require('mongoose');
const alarmRoutes = require('./routes/alarms');

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
mongoose.connect(port)
    .then(() => {
        app.listen(3000, () => {
            console.log(`Conncted to db and listening on port ${port}`);
        });
    })
    .catch(err => {
        console.log(err)
    });




