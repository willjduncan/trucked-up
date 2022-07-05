const { Schema, model } = require("mongoose");
const formatDate = require("../utils/formatData")

const projectSchema = new Schema({
  jobName: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    trim: true
  },
  driver: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  ],
  startTime: {
    type: Date,
    default: Date.now,
    get: (startTimeVal) => formatDate(startTimeVal)
  },
  pickUpAddress: {
    type: String,
  },
  deliveryAddress: {
    type: String,
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: "Client"
  },
  confirmed: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => formatDate(createdAtVal)
  },
});

const Project = model("Project", projectSchema);

module.exports = Project;
