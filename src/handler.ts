import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';

import { Resolvers, LinkType } from './schemaTypes';
import typeDefs from './schema.graphql';

interface AppGraphQLContext {
  userID: String;
}

const resolvers: Resolvers = {
  Query: {
    me(root, args, context: AppGraphQLContext) {
      return users.find(u => u.id === context.userID) || null;
    }
  },
  User: {
    __resolveReference(object: any) {
      return users.find(user => user.id === object.id) || null;
    }
  }
};

const server = new ApolloServer({
  schema: buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ]),
  debug: process.env.APP_ENV === 'prod' ? false : true,
  context: ({ event }): AppGraphQLContext => {
    const userID = event.headers?.['user-id'];
    return { userID };
  }
});

const users = [
  {
    id: 'test-user',
    name: 'Ada Lovelace',
    username: '@ada',
    about: {
      description: 'This is a decription',
      socialAccounts: [
        {
          type: LinkType.Twitch,
          url: 'http://twitch.tv',
          name: 'My Twitch Channel'
        }
      ]
    }
  },
  {
    id: 'comanderguy',
    name: 'Liam Muller',
    username: 'comanderguy',
    about: {
      description: 'This is a decription',
      socialAccounts: [
        {
          type: LinkType.Twitch,
          url: 'http://twitch.tv',
          name: 'My Twitch Channel'
        }
      ]
    }
  }
];

export const handler = (
  event: APIGatewayProxyEvent,
  context: Context,
  callback: Callback
) => {
  server.createHandler({
    cors: {
      origin: process.env.CORS_ORIGIN,
      credentials: true
    }
  })(event, context, (_err: any, data: any) => {
    callback(null, data);
  });
};
