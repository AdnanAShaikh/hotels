const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;

  if (!person.isModified("password")) return next();
  try {
    // hash password generation

    //generate salt
    const salt = await bcrypt.genSalt(10);

    //bcrypt the user entered password
    const hashedPassword = await bcrypt.hash(person.password, salt);

    //Override the plain password with the hashed one
    person.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

//this creates a 'function' for personSchema
//It checks if the password entered by the user(candidatePassword) is same as the one in the database

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {}
};
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
