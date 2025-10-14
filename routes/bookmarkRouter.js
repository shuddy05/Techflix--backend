const express = require("express");
const auth = require("../middleware/auth");
const {
  allBookmarked,
  addBookmark,
  removeBookmark,
} = require("../controllers/bookmarkedController");

const router = express.Router();
router.get("/", auth, allBookmarked);
router.get("/add/:id", auth, addBookmark);
router.get("/remove/:id", auth, removeBookmark);

module.exports = router;
