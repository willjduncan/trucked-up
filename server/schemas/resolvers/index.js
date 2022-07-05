const usersResolvers = require("./userResolvers");
const clientResolvers = require('./clientResolvers');
const projectResolvers = require('./projectResolvers')

const resolvers = {
  Query: {
    ...usersResolvers.Query,
    ...clientResolvers.Query,
    ...projectResolvers.Query
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...clientResolvers.Mutation,
    ...projectResolvers.Mutation
  },
};

module.exports = resolvers;
