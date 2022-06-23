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
  type Auth {
    token: ID!
    user: User!
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
    me: User!
    getUsers: [User]!
  }

  type Mutation {
    register(
      username: String!
      email: String!
      position: String!
      password: String!
      confirmPassword: String!
    ): Auth!
    login(email: String!, password: String!): Auth!
  }
`;

module.exports = typeDefs;
