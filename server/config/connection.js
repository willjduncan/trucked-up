const mongoose = require("mongoose");


//FIX DB NAME
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/PUT_YOUR_DB_NAME_HERE",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
