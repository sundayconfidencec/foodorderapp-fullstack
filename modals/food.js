
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const  FoodSchema = new  mongoose.Schema({
    foodName: {
        type: String,
        require: true
    },
    foodQuantity: {
        type: String,
        required: true
    },
    proteinType: {
        type: String,
        required: true
    },
    packageType: {
        type: String,
        required: true
    },
    allfoods: [
        {
            foodId: {required: true, type: Schema.Types.ObjectId, ref: "FoodAccount"}
        }
    ]
});

const foodModal = mongoose.model("food", FoodSchema);
module.exports = foodModal;



// let databases = require("./database");
// class foodModal {
//     constructor({foodName, foodQuantity, proteinType, packageType}){
//         this.foodName = foodName;
//         this.foodQuantity = foodQuantity;
//         this.proteinType = proteinType;
//         this.packageType = packageType;
//     }
//     save(){
//         databases.push(this);
//         return this;
//     }
//     static all(){
//         return databases;
//     }
//     static update(updatedFoodOrder = {}){
//         databases = databases.map(food =>{
//             if(food.foodName === updatedFoodOrder.foodName){
//                 return {...food, ...updatedFoodOrder};
//             }
//             return food;
//         })
//     }
//     static delete({foodName}){
//         let deletedFood = null;
//         databases = databases.filter(food =>{
//         if(food.foodName !== foodName){
//             return true;
//         }
//         deletedFood = food;
//         return false;
//         });
//         deletedFood;

//     }
// };
// module.exports = foodModal;