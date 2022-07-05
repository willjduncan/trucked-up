const { User, Client } = require("../../models");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");

const { validateCliant } = require("../../utils/validators");

module.exports = {
  Query: {
    getClients: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Errors", {
          errors: { auth: "Not an authorized user." },
        });
      }
      const clients = await Client.find().populate("projects").populate({
        path: "projects",
        populate: "driver",
      });

      if (!clients) {
        throw new UserInputError("Errors", {
          errors: { clients: "No clients in the DB at this time." },
        });
      }

      return clients;
    },

    getClient: async (parent, { name }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Errors", {
          errors: { auth: "Not an authorized user." },
        });
      }
      const client = await Client.findOne({name}).populate("projects")
      .populate({
        path: "projects",
        populate: "driver"
      });

      if (!client) {
        throw new UserInputError("Errors", {
          errors: { client: "No clients in the DB at this time." },
        });
      }

      return client;
    },
  },

  Mutation: {
    addClient: async (parent, { name }, context) => {
      if (!context.user) {
        throw new AuthenticationError("Errors", {
          errors: { auth: "Not an authorized user." },
        });
      }

      const { valid, errors } = validateCliant(name);

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const client = await Client.findOne({ name });
      if (client) {
        throw new UserInputError("Errors", {
          errors: {
            client: "It appears that this client already exists in the system.",
          },
        });
      }

      const newClient = await Client.create({ name });

      return newClient;
    },
  },
};
