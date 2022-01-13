const mongoose = require("mongoose");

const ProfileSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bio: { type: String, require: true },
    social: {
      youtube: { type: String },
      twitter: { type: String },
      instgram: { type: String },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Profile", ProfileSchema);
