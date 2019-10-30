import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloServer } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';
import typeDefs from './schema.graphql';

const resolvers = {
  Query: {
    me() {
      return users[0];
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
  context: ({ event }) => {
    const userID = event.headers ? event.headers['user-id'] : undefined;
    return { userID };
  }
});

const users = [
  {
    id: '1',
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
