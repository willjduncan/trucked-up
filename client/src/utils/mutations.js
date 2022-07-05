import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $position: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      position: $position
      password: $password
      confirmPassword: $confirmPassword
    ) {
      token
      # CHECK if need more new user data!
      user {
        _id
        username
        # email
        # password
        # position
        # projects {
        #   _id
        #   jobName
        #   description
        #   driver: [User]
        #   startTime
        #   pickUpAddress
        #   deliveryAddress
        #   createdAt
        #   client: Client
        # }
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      # CHECK if need more user data!
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_CLIENT = gql`
  mutation addClient($name: String!) {
    addClient(name: $name) {
      _id
      name
    }
  }
`;

export const ADD_PROJECT = gql`
  mutation addProject(
    $driverEmail: String!
    $clientName: String!
    $jobName: String!
    $description: String!
    $pickUpAddress: String!
    $deliveryAddress: String!
  ) {
    addProject(
      driverEmail: $driverEmail
      clientName: $clientName
      jobName: $jobName
      description: $description
      pickUpAddress: $pickUpAddress
      deliveryAddress: $deliveryAddress
    ) {
      _id
      jobName
      description
      driver {
        email
        # email
        # password
        # position
        # projects {
        #   _id
        #   jobName
        #   description
        #   driver: [User]
        #   startTime
        #   pickUpAddress
        #   deliveryAddress
        #   createdAt
        #   client: Client
        # }
      }
      # startTime
      pickUpAddress
      deliveryAddress
      # createdAt
      client {
        # _id
        name
        # projects
      }
    }
  }
`;

// export const EDIT_CONFIRM = gql`
//   mutation editConfirm($_id: _id!) {
//     editComplete(name: $name) {
//       _id
//       name
//     }
//   }
// `;

export const EDIT_CONFIRM = gql`
  mutation editConfirm($_id: ID) {
    editConfirm(_id: $_id) {
      _id
      confirmed
    }
  }
`;

export const EDIT_COMPLETE = gql`
  mutation editComplete($_id: ID) {
    editComplete(_id: $_id) {
      _id
      completed
    }
  }
`;
