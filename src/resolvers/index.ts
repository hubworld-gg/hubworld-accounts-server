import { Resolvers } from 'schemaTypes';

import getMe from './getMe';
import getUserById from './getUserById';
import getUserReference from './getUserReference';
import getUsersBySearch from './getUsersBySearch';
import createUser from './createUser';

const resolvers: Resolvers = {
  Query: {
    me: (root, args, context: AppGraphQLContext) => getMe(root, args, context),
    userById: (root, args, context: AppGraphQLContext) =>
      getUserById(root, args, context),
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
