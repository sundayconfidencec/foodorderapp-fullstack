
const express = require("express");
const router = express.Router();
const {createFoodAccountController,listFoodAccountController} = require("../controllers/account");
const {body} = require("express-validator");


router.post("/foodAccount",[
    body("foodName").trim().not().isEmpty().withMessage("food name can't be empty").isAlpha(),
    body("foodSize").trim().not().isEmpty().withMessage("food name can't be empty").isAlphanumeric(),
    body("protein").trim().not().isEmpty().withMessage("food name can't be empty").isAlpha(),
    body("package").trim().not().isEmpty().withMessage("food name can't be empty").isAlpha(),
], createFoodAccountController);
router.get("/foodAccounts", listFoodAccountController);

module.exports = router;
