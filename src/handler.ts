import { APIGatewayProxyEvent, Context, Callback } from 'aws-lambda';
import { ApolloServer, gql } from 'apollo-server-lambda';
import { buildFederatedSchema } from '@apollo/federation';

export interface AppUserContext {
  username: string;
  email: string;
}

export interface AppGraphQLEvent extends APIGatewayProxyEvent {
  user: AppUserContext;
}

export interface AppGraphQLContext {
  user: AppUserContext;
}

const typeDefs = gql`
  extend type Query {
    me: User
  }
  type User @key(fields: "id") {
    id: ID!
    name: String
    username: String
  }
`;

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
  context: ({
    event,
    context
  }: {
    event: AppGraphQLEvent;
    context: AppGraphQLContext;
  }): AppGraphQLContext => {
    return {
      user: event.user
    };
  }
});

const users = [
  {
    id: '1',
    name: 'Ada Lovelace',
    birthDate: '1815-12-10',
    username: '@ada'
  },
  {
    id: '2',
    name: 'Alan Turing',
    birthDate: '1912-06-23',
    username: '@complete'
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
