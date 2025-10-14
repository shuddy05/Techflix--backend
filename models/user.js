const mongoose = require("mongoose");
// import mongoose here, which is used to interact with the database(MongoDB) and define data schema/model
const userSchema = new mongoose.Schema({
  // define the email field for users schema, which store user's email/password
  email: {
    type: String,
    // specifies that the email field should be of data type 'String'
    unique: true,
    //Ensure that user has a unique email, so as to prevent duplicate email address
    required: true,
    // Marks the email field as required, meaning a user has to provide his email address before access
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
