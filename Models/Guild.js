const { Schema, model} = require("mongoose");

const UserSchema = Schema(
  {
    _id: String,
    id: String,
    UniqueId: String,
    User: String,
    Info: String,
    Timestamp: String

  }
);

module.exports = model("User", UserSchema );