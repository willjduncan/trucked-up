const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/trucked-up', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch(() => console.log("MongoDB connetion error"));

module.exports = mongoose.connection;
