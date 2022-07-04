const { User } = require("../../models");
const {
  AuthenticationError,
  UserInputError,
} = require("apollo-server-express");
const {
  validateRegisterInput,
  validateLoginInput,
} = require("../../utils/validators");
const { signToken } = require("../../utils/auth");

module.exports = {
  Query: {
    me: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Errors", {
          errors: { auth: "Not an authorized user" },
        });
      }
      const userData = await User.findOne({ _id: context.user._id })
        .select("-__v -password")
        .populate("projects")
        .populate({
          path: "projects",
          populate: "driver",
        });

      return userData;
    },
    meComplete: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Errors", {
          errors: { auth: "Not an authorized user" },
        });
      }
      const userData = await User.findOne({ _id: context.user._id })
        .select("-__v -password")
        .populate({
          path:"projects",
          match: { completed: true },
        })

      return userData;
    },
    meIncomplete: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Errors", {
          errors: { auth: "Not an authorized user" },
        });
      }
      const userData = await User.findOne({ _id: context.user._id })
        .select("-__v -password")
        .populate({
          path:"projects",
          match: { completed: false },
        })

      return userData;
    },
    getUsers: async (parent, args, context) => {
      if (!context.user) {
        throw new AuthenticationError("Errors", {
          errors: { auth: "Not an authorized user" },
        });
      }
      const users = await User.find().populate("projects").populate({
        path: "projects",
        populate: "driver",
      });

      if (!users) {
        throw new UserInputError("Errors", {
          errors: { userData: "No users in this DB!" },
        });
      }

      return users;
    },
    getUser: async(parant, {email}, context) => {
      if (!context.user) {
        throw new AuthenticationError("Errors", {
          errors: { auth: "Not an authorized user" },
        });
      }
      const user = await User.findOne({email});
      if (!user) {
        throw new UserInputError("Errors", {
          errors: { user: "User not in this DB!" },
        });
      }

      return user;
    }
  },
  Mutation: {
    // Create new user
    register: async (parent, args) => {
      // Validate client data before posting to DB
      const { valid, errors } = validateRegisterInput(
        args.username,
        args.email,
        args.position,
        args.password,
        args.confirmPassword
      );

      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const foundUsername = await User.findOne({ username: args.username });
      const foundUserEmail = await User.findOne({ email: args.email });

      if (foundUsername) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken",
          },
        });
      }

      if (foundUserEmail) {
        throw new UserInputError("Email is taken", {
          errors: {
            email: "This email is taken",
          },
        });
      }

      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },

    // LOGIN USER
    login: async (parent, { email, password }) => {
      // Validate client data before posting to DB
      const { valid, errors } = validateLoginInput(email, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      // Check to see if user email exists
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError("Incorrect credentials", {
          errors: {
            credentials: "Your credentials are sus",
          },
        });
      }

      // Validate password
      const isPassword = await user.isCorrectPassword(password);

      // If wrong password, throw error
      if (!isPassword) {
        throw new AuthenticationError("Incorrect credentials", {
          errors: {
            credentials: "Your credentials are sus",
          },
        });
      }

      // If all valide, return user & token
      const token = signToken(user);
      return { token, user };
    },
  },
};
