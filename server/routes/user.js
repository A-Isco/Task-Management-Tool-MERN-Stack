const express = require("express");
const router = express.Router();

const { resetPassword } = require("../controllers/userController");

router.patch("/resetPassword", resetPassword);

module.exports = router;
