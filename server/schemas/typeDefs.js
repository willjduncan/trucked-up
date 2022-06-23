const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    position: String
    clients: [Client]
  }

  type Client {
    _id: ID!
    name: String!
    projects: [Project]
  }

  type Project {
    _id: ID
    jobName: String
    description: String
    driver: [Driver]
    startTime: String
    pickUpAddress: String
    deliveryAddress: String
    createdAt: String
  }

  type Driver {
    name: String
  }

  type Query {
    getUsers: [User]!
  }
`;

module.exports = typeDefs;
