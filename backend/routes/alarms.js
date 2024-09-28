const express = require('express');
const router = express.Router();
const Alarm = require('../models/alarmModel');

//get all alarms
router.get('/', async (req, res) => {
    try {
        const alarms = await Alarm.find().populate(""); 
        res.status(200).json(alarms);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

//get single alarm
router.get('/:id', async (req, res) => {
    try {
        const alarm = await Alarm.findById(req.params.id);
        if (!alarm) {
            return res.status(404).json({ error: 'Alarm not found' });
        }
        res.status(200).json(alarm);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching alarm' });
    }
});


//add alarm
router.post('/', async (req, res) => {
    try {
        const { description, priority, userId, lastActionTaken, status } = req.body;
        const newAlarm = new Alarm({
            description,
            priority,
            userId,
            lastActionTaken,
            status
        });

        await newAlarm.save();
        res.status(201).json(newAlarm);
    } catch (err) {
        res.status(400).json({ error: err });
    }
});

//update alarm
router.patch('/:id', async (req, res) => {
    try {
        const updates = req.body;
        //new: true makes the method return the alarm after it was updaed
        //runValidators: true applies mongoose schema validation
        const alarm = await Alarm.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
        if (!alarm) {
            return res.status(404).json({ error: 'Alarm not found' });
        }
        res.status(200).json(alarm);
    } catch (error) {
        res.status(400).json({ error: 'Error updating alarm' });
    }
});

//delete alarm
router.delete('/:id', async (req, res) => {
    try {
        const alarm = await Alarm.findByIdAndDelete(req.params.id);
        if (!alarm) {
            return res.status(404).json({ error: 'Alarm not found' });
        }
        res.status(200).json({ message: 'Alarm deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting alarm' });
    }
});


module.exports = router;