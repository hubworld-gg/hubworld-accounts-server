import { LinkType } from 'schemaTypes';

declare global {
  declare module '*.graphql' {
    import { DocumentNode } from 'graphql';

    const content: DocumentNode;
    export default content;
  }


  declare type AppGraphQLContext = {
    userID: string;
    docClient: AWS.DynamoDB.DocumentClient;
  };

  declare type AccountDBType = {
    id: string;
    username: string;
    displayName: string;
    description: string;
    socialAccounts: { type: LinkType!; url: string!; name: string!;}[]
  }
}

