import { Maybe, User, QueryUserByIdArgs } from 'schemaTypes';
import { firebaseDocToUser } from 'utils';

const getUserById = async (
  root: any,
  args: QueryUserByIdArgs,
  context: AppGraphQLContext
): Promise<Maybe<User>> => {
  const { firestoreClient } = context;
  const { id } = args;

  const doc = await firestoreClient
    .collection('users')
    .doc(id)
    .get();

  if (!doc.exists) return null;

  const data = doc.data();

  if (!data) return null;

  const user = firebaseDocToUser(doc, data);

  return user;
};

export default getUserById;
