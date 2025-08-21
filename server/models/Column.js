const mongoose = require('mongoose');

const ColumnSchema = new mongoose.Schema({
    title: String,

    cards: [
        {
            type: mongoose.Schema.ObjectId,
            ref: 'Card'
        }
    ],

    boardId: {
        type: mongoose.Schema.ObjectId,
        require: true
    },
    owner: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true
    }, //I will uncomment this field after the User module finishes

    createAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Column', ColumnSchema);