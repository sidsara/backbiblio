const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const signUpSchema = new mongoose.Schema({
  user: { type: String, required: true, unique: true, trim: true },
  Email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "please provide a valid Email"],
  },
  Password: {
    type: String,
    required: true,
    minlength: [8, "please enter at least 8 characters for the password"],
  },
  PasswordConfirm: {
    type: String,

    validate: {
      validator: function (el) {
        return el === this.Password;
      },
      message: "Passwords are not the same",
    },
  },
  Title: { type: String, required: true },
  selectedCategory: { type: String, required: true },
  idNumber: { type: Number, required: true },
  nCCP: { type: Number, required: true },
  amount: { type: Number, required: true },
  description: { type: String, trim: true, required: true },
  image: { type: [String], required: true },
  passwordResetToken: String,
  passwordResetExpires: Date,
  passwordChangedAt: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});
signUpSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};
signUpSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // False means NOT changed
  return false;
};
signUpSchema.pre("save", async function (next) {
  if (!this.isModified("Password")) return next();
  this.Password = await bcrypt.hash(this.Password, 12);
  this.PasswordConfirm = undefined;
  next();
});
signUpSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});
//FORGOT PASSWORD
signUpSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex"); //had le token houa li nzeftoh lel user
  this.passwordResetToken = crypto
    .createHash("sha256") //sha256 c l'algorithme
    .update(resetToken)
    .digest("hex");
  console.log({ resetToken }, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000; //il a 30min pour changer le mtps
  return resetToken;
};
//
const signModel = mongoose.model("signModel", signUpSchema);
module.exports = signModel;
