const express = require('express');
const router = express.Router();
const User = require('../models/userModel'); 

// Get all users 
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});

// Get single user
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findById(id);
        if(!user) {
            return res.status(400).json({error: 'user not found'});
        }
        
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({error: err});
    }
});

// Add a user
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser);
    } catch(err) {
        res.status(500).json({error: err});
    }
});

// Delete a user
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const user = await User.findByIdAndDelete(id);
        if(!user) {
            return res.status(404).json({error: 'user not found'});
        }

        res.status(200).json(user);
    } catch(err) {
        res.status(500).json({error: err});
    }
});
module.exports = router;