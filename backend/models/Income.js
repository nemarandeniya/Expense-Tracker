const mongoose = require("mongoose");

const IncomeScema = new mongoose.Schema({
    userid: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    icon: {
        type: String
    },
    source: {
        type: String, required: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true })

module.exports = mongoose.model("Income", IncomeScema)