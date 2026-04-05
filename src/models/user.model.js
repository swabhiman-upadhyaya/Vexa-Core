import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true
    },
    email: {
      type: String,
      lowerCase: true,
      unique: true,
      trim: true,
      required: true
    },
    password: {
      type: String,
      required: true,
      minlength: 8
    },
    verified: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

/* Saving hashed password into the databaase */
/* here calling next() means saving the password to DB */
async function hashingPassword(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);w
}
userSchema.pre("save", hashingPassword)

/* Comparing password with the hashed password in the DB user will login */
userSchema.methods.comparePassword = (candidatePassword) => {
  return bcrypt.compare (candidatePassword, this.password)
}

const userModel = mongoose.model("User", userSchema)

export default userModel