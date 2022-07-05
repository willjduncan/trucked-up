const { User, Client, Project } = require("../../models");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");

const { validateProjectAddition } = require("../../utils/validators");

module.exports = {
  Query: {
    getProjects: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Errors", {
          errors: { auth: "Not an authorized user." },
        });
      }

      const projects = await Project.find()
        .populate("driver")
        .populate("client");

      if (!projects) {
        throw new UserInputError("Errors", {
          errors: { projects: "No projects in the DB at this time." },
        });
      }

      return projects;
    },

    getProject: async (parent, { jobName }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Errors", {
          errors: { auth: "Not an authorized user." },
        });
      }

      const project = await Project.findOne({ jobName })
        .populate("driver")
        .populate("client");

      if (!project) {
        throw new UserInputError("Errors", {
          errors: { project: "This project does not yet exist." },
        });
      }

      return project;
    },
  },
  //{ jobName, description, startTime, pickUpAddress, deliveryAddress }
  Mutation: {
    addProject: async (
      parent,
      {
        driverEmail,
        clientName,
        jobName,
        description,
        pickUpAddress,
        deliveryAddress,
      },
      context
    ) => {
      const { valid, errors } = validateProjectAddition(
        driverEmail,
        clientName,
        jobName,
        description
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      // Verify client is in DB first
      const client = await Client.findOne({ name: clientName });
      if (!client) {
        throw new UserInputError("Errors", {
          errors: { client: "Client does not exist yet." },
        });
      }

      // Verify driver is in DB too
      const driver = await User.findOne({ email: driverEmail });
      if (!driver) {
        throw new UserInputError("Errors", {
          errors: { driver: "Driver does not exist yet." },
        });
      }

      // Verify project name does not exist
      const foundProject = await Project.find({ jobName });

      if (foundProject.length) {
        throw new UserInputError("Errors", {
          errors: { project: "This project already exists." },
        });
      }

      // Create new project
      const project = await Project.create({
        jobName,
        description,
        pickUpAddress,
        deliveryAddress,
      });

      // Update driver projects array with created project
      await driver.update(
        { $addToSet: { projects: { _id: project._id } } },
        { new: true }
      );

      // Update created project to hold ref to driver
      await project.update({ $addToSet: { driver: { _id: driver._id } } });

      // Update client to hold ref to new project
      await client.update(
        { $addToSet: { projects: { _id: project._id } } },
        { new: true }
      );

      return project;
    },
    deleteProject: async (parent, { jobName }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Errors", {
          errors: { auth: "Not an authorized user." },
        });
      }
      const project = await Project.deleteOne({ jobName });
      return project;
    },
    editComplete: async (parent, { _id }, context) => {
      console.log(_id);
      // const foundProject = await Project.find({ _id });
      // await foundProject.update({ completed: true });

      const updatedProject = await Project.findOneAndUpdate(
        { _id: _id },
        { completed: true},
        { new: true }
      );
      return updatedProject;
    },
    editConfirm: async (parent, { _id }, context) => {
      console.log(_id);
      // const foundProject = await Project.find({ _id });
      // await foundProject.update({ confirmed: true });
      // return foundProject;

      const updatedProject = await Project.findOneAndUpdate(
        { _id: _id },
        { confirmed: true},
        { new: true }
      );
      return updatedProject;
    },
  },
};
