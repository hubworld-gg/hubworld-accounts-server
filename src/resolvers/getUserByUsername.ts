import { User, QueryUserByUsernameArgs, Maybe } from 'schemaTypes';
import { firebaseDocToUser } from 'utils';

const getUserByUsername = async (
  root: any,
  args: QueryUserByUsernameArgs,
  context: AppGraphQLContext
): Promise<Maybe<User>> => {
  const { username } = args;

  const { firestoreClient } = context;

  const query = await firestoreClient
    .collection('users')
    .where('username', '==', username)
    .get();

  if (query.empty) return null;

  const doc = query.docs[0];
  const data = doc.data();

  const user = firebaseDocToUser(doc, data);

  return user;
};

export default getUserByUsername;
