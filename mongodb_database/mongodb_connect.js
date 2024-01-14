const mongoose = require("mongoose");

const connection = async () => {
  await mongoose
    .connect(process.env.MONGODB_DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .catch(() => {
      process.exit(1);
    });
};

module.exports = connection;
