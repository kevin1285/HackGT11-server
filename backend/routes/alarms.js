const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({'msg': 'GET request for alarms'});
});

router.post('/', async (req, res) => {
    try {
        const { description, priority, patientId, lastActionTaken, status } = req.body;
        const newAlarm = new Alarm({
            description,
            priority,
            patientId,
            lastActionTaken,
            status
        });

        await newAlarm.save();
        res.status(201).json(newAlarm);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});



module.exports = router;