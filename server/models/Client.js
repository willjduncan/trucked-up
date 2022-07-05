const { Schema, model } = require("mongoose");

const clientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    projects: [
      {
        type: Schema.Types.ObjectId,
        ref: "Project",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

clientSchema.virtual("projectCount").get(function () {
  return this.projects.length;
});

const Client = model("Client", clientSchema);

module.exports = Client;