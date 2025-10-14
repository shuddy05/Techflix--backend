// imports the "Movie" model, which interacts with the "Movies" collection in MongoDB
const Movie = require("../models/movies");

// CONTROLLER TO GET ALL BOOKMARKED MOVIES
// Defines an asynchronous function "allBookmarked" to handle the retrival of all movies bookmarked by a user
const allBookmarked = async (req, res) => {
  try {
    // Extract the "userId" from authenticated user (set by middleware to verify JWT token)
    const { userId } = req.user;
    // Finds all movies in the "Movies" collection where the "bookmarkedBy" field includes the "userId"
    const bookmarks = await Movie.find({ bookmarkedBy: userId });
    // sends a success response with status 200, returning the movies that the user has bookmarked
    res.status(200).json({ data: bookmarks });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// CONTROLLER TO BOOKMARK A NEW MOVIES TO THE BOOKMARK
const addBookmark = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: id },
      { $push: { bookmarkedBy: userId } }
    );
    if (!movie) {
      rex.status(400).json({ message: `No Movies with ID:${id}` });
    }
    res.status(200).json({ message: "Movie Bookmarked" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// CONTROLLER TO REMOVE AN EXISTING BOOKMARK
const removeBookmark = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const movie = await Movie.findByIdAndUpdate(
      { _id: id },
      { $pull: { bookmarkedBy: userId } }
    );
    if (!movie) {
      rex.status(400).json({ message: `No Movies with ID:${id}` });
    }
    res.status(200).json({ message: " Bookmarked Movie Removed Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { allBookmarked, addBookmark, removeBookmark };
