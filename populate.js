require("dotenv").config();

const mongoose = require("mongoose");
const Movies = require("./models/movies");
const movieJson = require("./movies.json");
// We are about to populate the api to the Database (populate, delete, update)

const populate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database for API connected successfully ");
    //
    console.log("Deleting prevoius data");
    await Movies.deleteMany();
    console.log("Previous method deleted successfully ");
    //
    console.log("Uploading new data ");
    await Movies.create(movieJson);
    console.log(movieJson);

    console.log("Uploaded successfully to the Database ");
    //
    process.exit(0);
  } catch (error) {
    console.error({ Error: error.message });
    console.log("Unale to connect");
    process.exit(1);
  }
};
populate();
