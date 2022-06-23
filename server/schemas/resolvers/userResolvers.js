const { User } = require("../../models");

module.exports = {
  Query: {
    getUsers: async (parent) => {
      return User.find();
    },
  },
};
