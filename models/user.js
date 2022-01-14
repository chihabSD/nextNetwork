const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: { type: String, required: true, select: false },

    username: { type: String, required: true, unique: true, trim: true },

    profilePicUrl: { type: String },

    newMessagePopup: { type: Boolean, default: true },

    unreadMessage: { type: Boolean, default: false },

    unreadNotification: { type: Boolean, default: false },

    role: { type: String, default: "user", enum: ["user", "root"] },

    resetToken: { type: String },

    expireToken: { type: Date },
  },
  { timestamps: true }
);
// hide password from query
UserSchema.set("toJSON", {
  transform: function (doc, ret, opt) {
    delete ret["password"];
    return ret;
  },
});
module.exports = mongoose.model("User", UserSchema);
