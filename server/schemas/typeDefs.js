const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    position: String
    projects: [Project]
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
    driver: [User]
    startTime: String
    pickUpAddress: String
    deliveryAddress: String
    createdAt: String
  }

  # type Driver {
  #   name: String
  # }

  type Query {
    me: User!
    getUsers: [User]!
    getUser(email: String!): User!
    getClients: [Client]!
    getClient(name: String!): Client!
    getProjects: [Project]!
    getProject(jobName: String!): Project!
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
    addClient(name: String!): Client!
    addProject(driverEmail: String!, clientName: String!, jobName: String!, description: String!, pickUpAddress: String!, deliveryAddress: String!): Project!
    deleteProject(jobName: String!): Project
  }
`;

module.exports = typeDefs;
