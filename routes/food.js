

const express = require("express");
const router = express.Router();
const {orderFoodController,allOrderController,editOrderController,deleteOrderController} = require("../controllers/food");
const {body} = require("express-validator");
const isAuth = require("../middlewares/isAuth");
const foodModal = require("../modals/food");


router.post("/food",isAuth,[
    body("foodName").trim().not().isEmpty().withMessage("food name can't be empty").isAlpha(),
    body("foodQuantity").trim().not().isEmpty().withMessage("foodQuantity can't be empty").isAlphanumeric(),
    body("proteinType").trim().not().isEmpty().withMessage("proteinType can't be empty").isAlpha(),
    body("packageType").trim().not().isEmpty().withMessage("packageType can't be empty").isAlpha(),
], orderFoodController);
router.get("/food/:id?",isAuth, allOrderController);
router.put("/food/:id",isAuth, editOrderController);
router.delete("/food/:id",isAuth, deleteOrderController);

module.exports = router;