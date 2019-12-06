import { User, QueryUserByEmailArgs, Maybe } from 'schemaTypes';
import { firebaseDocToUser } from 'utils';

const getUserByEmail = async (
  root: any,
  args: QueryUserByEmailArgs,
  context: AppGraphQLContext
): Promise<Maybe<User>> => {
  const { email } = args;

  const { firestoreClient } = context;

  const query = await firestoreClient
    .collection('users')
    .where('email', '==', email)
    .get();

  if (query.empty) return null;

  const doc = query.docs[0];
  const data = doc.data();

  const user = firebaseDocToUser(doc, data);

  return user;
};

export default getUserByEmail;
