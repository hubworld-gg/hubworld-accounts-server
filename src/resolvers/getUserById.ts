import { promisify } from 'utils';
import { Maybe, User, QueryUserByIdArgs } from 'schemaTypes';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';

const getUserById = async (
  root: any,
  args: QueryUserByIdArgs,
  context: AppGraphQLContext
): Promise<Maybe<User>> => {
  const user: Maybe<User> = await promisify((callback: any) => {
    const params: DocumentClient.QueryInput = {
      TableName: 'HubworldAccounts',
      KeyConditionExpression: 'id = :v1',
      ExpressionAttributeValues: {
        ':v1': args.id
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

export default getUserById;
