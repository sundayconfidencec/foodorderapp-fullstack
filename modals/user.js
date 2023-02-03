
const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const  UserSchema = new  Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accounts: [
        { id: {type: Schema.Types.ObjectId, ref: "FoodAccount"}
        }
    ]
});
const UserModal = mongoose.model("User", UserSchema);
module.exports = UserModal;
