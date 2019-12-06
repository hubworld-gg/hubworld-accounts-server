import { Resolvers } from 'schemaTypes';

import getMe from './getMe';
import createUser from './createUser';
import getUserById from './getUserById';
import getUserReference from './getUserReference';
import getUsersBySearch from './getUsersBySearch';
import getUserByUsername from './getUserByUsername';

const resolvers: Resolvers = {
  Query: {
    me: (root, args, context: AppGraphQLContext) => getMe(root, args, context),
    userById: (root, args, context: AppGraphQLContext) =>
      getUserById(root, args, context),
    userByUsername: (root, args, context: AppGraphQLContext) =>
      getUserByUsername(root, args, context),
    usersBySearch: (root, args, context: AppGraphQLContext) =>
      getUsersBySearch(root, args, context)
  },
  User: {
    __resolveReference: (userReference, context: AppGraphQLContext) =>
      getUserReference(userReference, context)
  },
  Mutation: {
    createUser: (root, args, context) => createUser(root, args, context)
  }
};

export default resolvers;
