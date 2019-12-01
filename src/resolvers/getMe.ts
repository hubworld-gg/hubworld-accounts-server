import { promisify } from 'utils';
import { Maybe, User } from 'schemaTypes';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const getMe = async (
  root: any,
  args: {},
  context: AppGraphQLContext
): Promise<Maybe<User>> => {
  const user: Maybe<User> = await promisify((callback: any) => {
    const params: DocumentClient.QueryInput = {
      TableName: 'HubworldAccounts',
      KeyConditionExpression: 'id = :v1',
      ExpressionAttributeValues: {
        ':v1': context.userID
      }
    };
    context.docClient.query(params, callback);
  }).then((result: any) => {
    const accountResult: AccountDBType = result.Items?.[0];

    if (!accountResult) return null;

    const user: User = {
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

export default getMe;
