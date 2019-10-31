import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';
import typeDefs from './schema.graphql';

export interface AppGraphQLContext {
  userID: String;
}

const resolvers = {
  Query: {
    me(_: any, __: any, context: AppGraphQLContext) {
      return users.find(u => u.id === context.userID);
    }
  },
  User: {
    __resolveReference(object: any) {
      return users.find(user => user.id === object.id);
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
    const userID = event.headers ? event.headers['user-id'] : undefined;
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
          type: 'TWITCH',
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
  })(event, context, (err: any, data: any) => {
    callback(null, data);
  });
};
