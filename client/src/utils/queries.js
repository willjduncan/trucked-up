import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      # CHECK if need more user data!
      # password
      position
      projects {
        _id
        jobName
        description
        driver {
          _id
          username
          # email
          projects {
            #   _id
            jobName
          }
        }
        startTime
        pickUpAddress
        deliveryAddress
        #   createdAt
        # client {
        #   _id
        #   name
        # }
        completed
        confirmed
      }
    }
  }
`;
export const QUERY_ME_COMPLETE = gql`
  {
    me {
      _id
      username
      position
      projects {
        #   _id
        jobName
        description
        startTime
        pickUpAddress
        deliveryAddress
        createdAt
        client: Client
        completed
        confirmed
      }
    }
  }
`;

export const QUERY_ME_INCOMPLETE = gql`
  {
    me {
      _id
      username
      position
      projects {
        #   _id
        jobName
        description
        startTime
        pickUpAddress
        deliveryAddress
        createdAt
        client: Client
        completed
        confirmed
      }
    }
  }
`;

export const QUERY_USERS = gql`
  {
    getUsers {
      _id
      username
      # CHECK if need more user data!
      # email
      # password
      position
      projects {
        #   _id
        jobName
        #   description
        #   driver: [User]
        #   startTime
        #   pickUpAddress
        #   deliveryAddress
        #   createdAt
        client {
          # _id
          name
        }
        completed
        confirmed
      }
    }
  }
`;

export const QUERY_USER = gql`
  query getUser($email: String!) {
    getUser(email: $email) {
      _id
      username
      # CHECK if need more user data!
      # email
      # password
      # position
      projects {
        #   _id
        jobName
        #   description
        #   driver: [User]
        #   startTime
        #   pickUpAddress
        #   deliveryAddress
        #   createdAt
        #   client: Client
      }
    }
  }
`;

export const QUERY_CLIENTS = gql`
  {
    getClients {
      _id
      username
      email
      # CHECK if need more user data!
      # password
      # position
      projects {
        _id
        jobName
        description
        #   driver: [User]
        #   startTime
        #   pickUpAddress
        #   deliveryAddress
        #   createdAt
        #   client: Client
      }
    }
  }
`;

export const QUERY_CLIENT = gql`
  query getClient($name: String!) {
    getClients(name: $name) {
      _id
      username
      email
      # CHECK if need more user data!
      # password
      # position
      projects {
        _id
        jobName
        description
        #   driver: [User]
        #   startTime
        #   pickUpAddress
        #   deliveryAddress
        #   createdAt
        #   client: Client
      }
    }
  }
`;

export const QUERY_PROJECTS = gql`
  {
    getProjects {
      _id
      jobName
      description
      driver {
        _id
        username
        # email
        # password
        # position
        projects {
          #   _id
          jobName
          #   description
          #   driver: {[User]}
          #   startTime
          #   pickUpAddress
          #   deliveryAddress
          #   createdAt
          #   client
        }
      }
      startTime
      pickUpAddress
      deliveryAddress
      # createdAt
      client {
        _id
        name
        #   projects {}
      }
      completed
      confirmed
    }
  }
`;

export const QUERY_PROJECT = gql`
  query getProject($jobName: String!) {
    getProject {
      _id
      jobName
      description
      driver {
        _id
        username
        # email
        # password
        # position
        # projects {
        #   _id
        #   jobName
        #   description
        #   driver: {[User]}
        #   startTime
        #   pickUpAddress
        #   deliveryAddress
        #   createdAt
        #   client: {Client}
        # }
      }
      startTime
      pickUpAddress
      deliveryAddress
      createdAt
      client {
        _id
        name
        # projects {}
      }
    }
  }
`;
