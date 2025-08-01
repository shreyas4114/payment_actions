const mongoose = require("mongoose");
const moment = require('moment-timezone');
require('dotenv').config(); 

const {
    MONGO_PASSWORD,
    MONGO_HOST,
} = process.env;

// Construct the URI
const MONGO_URI = `mongodb://admin:${MONGO_PASSWORD}@${MONGO_HOST}:27017/payment?authSource=admin`;

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

// mongoose.connect('mongodb_url');

// Create a Schema for Users
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        maxLength: 30
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 50
    }});
   
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,   // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const transactionSchema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,   // Reference to User model
        ref: 'User',
        required: true
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,   // Reference to User model
        ref: 'User',
        required: true
    },
    fromName: {
        type: String,
        required: true
    },
    toName: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        require: true
    },
    time: {
        type: Date,
        required: true,
        default: () => moment.tz('Asia/Kolkata').toDate()
    }
});

transactionSchema.index({ from: 1, to: 1, time: -1 });

const User = mongoose.model("User", userSchema);
const Account = mongoose.model("Account", accountSchema);
const Transactions = mongoose.model("Transactions", transactionSchema);

module.exports = { 
    User,
    Account,
    Transactions
}