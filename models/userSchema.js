import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema(
  {
    name: { type: String, unique: false, required: true },
    surname: { type: String, unique: false, required: true },
    email: { type: String, unique: true, required: true },
    securityQue: { type: String, unique: false, required: true },
    securityAns: { type: String, unique: false, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, unique: false, required: true },
    deleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

UserSchema.pre("save", function(next) {
  var user = this;
  if (!user.isModified("password")) return next();

  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) return next(err);

      user.password = hash;
      next();
    });
  });
});
module.exports = mongoose.model("user", UserSchema);
