

const foodModal = require("../modals/food");
const accountFoodModal = require("../modals/account");
const { validationResult } = require("express-validator");

//controllers
const orderFoodController = (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        console.log(errors)
        return res.json({message: errors.array()[0].msg});
    }
    const {foodName, foodQuantity, proteinType, packageType} = req.body;
    const food = new foodModal ({foodName, foodQuantity, proteinType, packageType});
    food.save().then(result => {
    
        res.json({message: "your order has successfully been placed", order: result});
    }).catch(err => console.log(err));
    }

    const allOrderController = (req, res)=>{
    // const orderlist = foodModal.all();
    const {id} = req.params;
    if(id){
    foodModal.find({_id:id}).then(foods => {
        res.json({message: "here are all your orders", orders: foods});
    }).catch(err => console.log(err));
    }else{
        foodModal.find().then(foods => {
            res.json({message: "here are all your orders", orders: foods});
        }).catch(err => console.log(err)); 
    }
    }
    
    const editOrderController = (req, res) =>{
        const {id:foodID} = req.params;
        foodModal.findByIdAndUpdate({_id: foodID}, req.body,{
            new: true,
            runValidators:true
        }).then(food => {
            if(food){
                res.status(200).json({food})
            }
        })
    }

    
                // food.foodName = foodName;
                // food.foodQuantity = foodQuantity;
                // food.proteinType = proteinType;
                // food.packageType = packageType;
    
                // food.save();
    
                // res.json({message: "Your order has been updated", order: food})
            //}
           // res.json({message: "order update failed try again"})
       // })
        //catch(err => console.log(err))
        // const updatedOrder = foodModal.update({foodName, foodQuantity, proteinType, packageType});
        // res.json({message: "Your order has been updated", order: updatedOrder});
    //}

    

    const deleteOrderController = (req, res) =>{
        const {id} = req.params;
        foodModal.findByIdAndRemove(id).then(deletedFood => {
            if(deletedFood){
                accountFoodModal.deleteMany({foodId: deleteOrderController._id}).then(result => {
                    res.json({message: "Your order has successfully been cancelled", cancelledOrder: deletedFood})
        
                }).catch(err => console.log(err));
                return;
            }
            res.json({message: "foodOrder not found"})
        }).catch(err => console.log(err));
        }
        
        
      
        
module.exports = {orderFoodController,allOrderController,editOrderController,deleteOrderController};