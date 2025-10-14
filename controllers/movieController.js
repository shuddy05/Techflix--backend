const Movies = require("../models/movies");

// CONTROLLER TO GET ALL THE DATA (SERIES & MOVIES)
const allData = async (req, res) => {
  try {
    const data = await Movies.find({}); // to get the movies
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// CONTROLLER TO GET ALL SERIES

const allSeries = async (req, res) => {
  try {
    const series = await Movies.find({ type: "series" });
    res.status(200).json({ data: series });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// CONTROLLER TO GET ALL MOVIE

const allMovies = async (req, res) => {
  try {
    const movies = await Movies.find({ type: "movie" });
    res.status(200).json({ data: movies });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { allData, allSeries, allMovies };
