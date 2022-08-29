const { User } = require("../models");
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {

        me : async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!')
        }
    },

    Mutation: {
        addUser : async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },

        login : async (parent, { email, password }) => {
            const user = await User.find({ email });

            if (!user) {
                throw new AuthenticationError('No user with this email!');
            };

            const correctPw = await User.isCorrectPassword(password)

            if (!correctPw) {
                throw new AuthenticationError('Incorrect Password!');
            };

            const token = signToken(user);

            return { user, token }
        },

        saveBook: async (parent, { book }, context) => {
            if (context.user) {
                const update = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: book }},
                    { new: true }
                );
                return update;
            }

            throw new AuthenticationError("You need to be logged in!");
        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                const removeBook = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId }}},
                    { new: true }
                );

                return removeBook;
            }

            throw new AuthenticationError("You need to be logged in!");
        }
    }
}

module.exports = resolvers

