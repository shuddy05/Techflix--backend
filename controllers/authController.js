const User = require("../models/user");
// install bcrypt to hash the user password
const bcrypt = require("bcryptjs");
// install and import jsonwebtoken
// import JWT to enable token for regiser and login
const jwt = require("jsonwebtoken");

// CONTROLLER func TO REGISTER/SIGN-UP (async & await)
// Pass a req and res parameters

const register = async (req, res) => {
  try {
    // Destructure the Post request from the body(server/browser body)
    const { email, password, repeatPassword } = req.body; // Req
    //// handle repeat password
    if (password !== repeatPassword) {
      res.status(406).json({ message: "Password Mismatch" });
    }
    const salt = await bcrypt.genSalt(10);
    /// hash password at the salt level of 10
    const hashedPassword = await bcrypt.hash(password, salt);
    /// equate the password to hashPassword
    const user = await User.create({ email, password: hashedPassword });
    ///////////////////
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    // handle response
    res.status(201).json({ message: "Registration Successful", user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// CONTROLLER FOR LOGIN/SIGN-IN
const login = async (req, res) => {
  try {
    //  destructure from req.body
    const { email, password } = req.body;
    // find the already signedup/registered user/account
    const user = await User.findOne({ email });
    /// if there is no user
    if (!user) {
      res.status(401).json({ message: "User does not exist", user });
    }
    // Compare password with the already signup user password for Access
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    // write an if statement for password validation
    if (!isPasswordMatch) {
      res.status(401).json({ message: "Wrong password", user });
    }
    // token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "3d",
      });

    res.status(200).json({ message: "Login was Successful", user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// CONTROLLER TO LOGOUT AN EXISTING USER
const logout = async (req, res) => {
  try {
    // Since Jwts are stateless, we can't truly "delete" them on the backend
    // what we can do is simply tell the client to delete their copy
    // You can also implement token blacklisting if needed in the
    res.status(200).json({ message: "Logout Successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// CONTROLLER TO GET USERS THAT REGISTERED
const getUser = (req, res) => {
  // we leverage on the user's id and with that; we can destructure the userId from req.user
  const { userId } = req.user;
  res.status(200).json({ id: userId });
};

module.exports = { register, login, getUser, logout };
