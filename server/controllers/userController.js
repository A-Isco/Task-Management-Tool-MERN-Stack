const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const {
  signupValidationSchema,
  loginValidationSchema,
  verifyValidationSchema,
} = require("../schemas/authSchemas");

const { genSalt, hash, compare } = bcrypt;
const { sign } = jwt;

// Reset Password
const resetPassword = async (req, res) => {
  let email = req.body.email;
  let oldPassword = req.body.oldPassword;
  let newPassword = req.body.newPassword;

  // Check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not found");

  if (user) {
    // Check correct password
    const validPassword = await compare(oldPassword, user.password);
    if (!validPassword) {
      res.status(400).send("Old password not correct");
    } else {
      // Hashing new password
      const salt = await genSalt(14);
      const encryptedPassword = await hash(newPassword, salt);

      try {
        let user = await User.findOneAndUpdate(
          { email: email },
          { password: encryptedPassword }
        );

        res.status(200).json({
          message: `Password was reset successfully`,
          user: user,
        });
      } catch (error) {
        res.status(500).send(error.message);
      }
    }
  }
};

module.exports = { resetPassword };
