const { Schema, model } = require("mongoose");

const projectSchema = new Schema({
  jobName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    trim: true
  },
  driver: [
    {
      type: String,
      require: true,
    },
  ],
  startTime: {
    type: Date,
    default: () => Date.now(),
  },
  pickUpAddress: {
    type: String,
  },
  deliveryAddress: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
  },
});

const Project = model("Project", projectSchema);

module.exports = Project;
