// import the jsonwebtoken library, which is used to sign and verify JWT token
const jwt = require("jsonwebtoken");
// Define the "extractToken" function to extract the token from the authorization header
const extractToken = (authHeader) => {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // if the token is missing or invalid "No Token Provided" will appear in the console
    console.log("No Token Provided");
  }
  return authHeader.split(" ")[1];
};

// Define the auth middleware function to authenticatte incoming requests
const auth = (req, res, next) => {
  try {
    // Extracts the token from the "Authorization" header using the extractToken funtion
    const token = extractToken(req.headers.authorization);
    // Verifies the tokn using jwt secretkey stored in .env
    // if valid, the "payload" contains the decoded token data (userID)
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Adds the userId from the tokens payload to the req object for future use.
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = auth;
