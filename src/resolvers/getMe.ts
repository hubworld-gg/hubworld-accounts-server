import { Maybe, User } from 'schemaTypes';
import { firebaseDocToUser } from 'utils';

const getMe = async (
  root: any,
  args: {},
  context: AppGraphQLContext
): Promise<Maybe<User>> => {
  const { userID, firestoreClient } = context;

  const doc = await firestoreClient
    .collection('users')
    .doc(userID)
    .get();

  if (!doc.exists) return null;

  const data = doc.data();

  if (!data) return null;

  const user = firebaseDocToUser(doc, data);

  return user;
};

export default getMe;
