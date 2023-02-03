
const { validationResult } = require("express-validator");
const accountFoodModal = require("../modals/account");


const createFoodAccountController = (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors)
        return res.json({message: errors.array()[0].msg});
    }
    const {foodName,foodSize, protein, package, foodId} = req.body;
    const foodAccount = new accountFoodModal({foodName, foodSize, protein, package, foodId});

    foodAccount.save().then(result => {
        if(result){
            res.json({message: "food Account created", data: result})
        }else{
            res.json({message: "failed to create book account"})
        }
    })
}
const listFoodAccountController = (req, res) => {
    accountFoodModal.find().populate("foodId", "foodName foodQuantity proteinType  packageType -_id").then(result => {
        res.json({data: result});
    }).catch(err => console.log(err));
}


module.exports = {createFoodAccountController,listFoodAccountController};