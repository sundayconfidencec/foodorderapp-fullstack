const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const AccountFoodSchema = new Schema({
    foodName: {
        type: String,
        required: true
    },
    foodSize: {
        type: String,
        required: true
    },
    protein:{
        type: String,
        required: true
    },
    package:{
        type: String,
        required: true
    },
    foodId: {
        type: Schema.Types.ObjectId,
        ref: "food"
    }
});

module.exports = mongoose.model("FoodAccount", AccountFoodSchema);