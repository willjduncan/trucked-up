const usersResolvers = require('./userResolvers');

const resolvers = {
    Query: {
        ...usersResolvers.Query,
    },
}

module.exports = resolvers;