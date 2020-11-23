const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
 {
    firstname:
    {
        type: String,
        required: true,
        unique: false,
        trim: true,
        minlength: 3
    },
    age:
    {
        type: Number, required: true
    },
    cellNum:
    {
        type: String, required: true
    },
    birth:
    {
        type: Date, required: true
    }
},
{
    timestamps: true,
},);

const User = mongoose.model('User', userSchema);
module.exports = User;