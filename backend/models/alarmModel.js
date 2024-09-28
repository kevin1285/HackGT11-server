const mongoose = require('mongoose');

const alarmSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['low', 'high'],
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    triggeredAt: {
        type: Date,
        default: Date.now
    },
    lastActionTaken: {
        action: {
            type: String,
        },
        takenAt: {
            type: Date,
            default: Date.now
        }
    },
    status: {
        type: String,
        enum: ['active', 'resolved'],
        default: 'active'
    }
});

const Alarm = mongoose.model('Alarm', alarmSchema);
module.exports = Alarm;

