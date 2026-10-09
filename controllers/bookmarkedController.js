const Movie = require("../models/movies");

const allBookmarked = async (req, res) => {
  try {
    const { userId } = req.user;
    const bookmarks = await Movie.find({ bookmarkedBy: userId });
    res.status(200).json({ data: bookmarks });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const addBookmark = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const movie = await Movie.findOneAndUpdate(
      { _id: id },
      { $push: { bookmarkedBy: userId } }
    );
    if (!movie) {
      res.status(400).json({ message: `No Movies with ID:${id}` });
    }
    res.status(200).json({ message: "Movie Bookmarked" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const removeBookmark = async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;
  try {
    const movie = await Movie.findByIdAndUpdate(
      { _id: id },
      { $pull: { bookmarkedBy: userId } }
    );
    if (!movie) {
      res.status(400).json({ message: `No Movies with ID:${id}` });
    }
    res.status(200).json({ message: " Bookmarked Movie Removed Successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { allBookmarked, addBookmark, removeBookmark };
