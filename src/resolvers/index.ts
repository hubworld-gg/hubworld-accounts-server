import { Resolvers } from 'schemaTypes';

import getMe from './getMe';
import getUserById from './getUserById';
import getUserReference from './getUserReference';
import getUsersBySearch from './getUsersBySearch';

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
  }
};

export default resolvers;
