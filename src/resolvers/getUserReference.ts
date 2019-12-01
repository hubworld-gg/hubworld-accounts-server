import { promisify } from 'utils';
import { LinkType, User, Maybe } from 'schemaTypes';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const getUserReference = async (
  userReference: {
    __typename: 'User';
  } & Pick<User, 'id'>,
  context: AppGraphQLContext
): Promise<Maybe<User>> => {
  const user: Maybe<User> = await promisify((callback: any) => {
    const params: DocumentClient.QueryInput = {
      TableName: 'HubworldAccounts',
      KeyConditionExpression: 'id = :v1',
      ExpressionAttributeValues: {
        ':v1': userReference.id
      }
    };
    context.docClient.query(params, callback);
  }).then((result: any) => {
    const accountResult: AccountDBType = result.Items?.[0];

    if (!accountResult) return null;

    const user: User = {
      __typename: 'User',
      id: accountResult.id,
      about: {
        description: accountResult.description,
        socialAccounts: accountResult.socialAccounts
      },
      displayName: accountResult.displayName ?? accountResult.username,
      username: accountResult.username
    };

    return user;
  });
  return user;
};

export default getUserReference;
