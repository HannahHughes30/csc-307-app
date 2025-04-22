import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    job: {
      type: String,
      required: true,
      trim: true,
    },
    // MongoDB will automatically add _id field
  },
  { collection: "users_list" }
);

const User = mongoose.model("User", UserSchema);

export default User;
