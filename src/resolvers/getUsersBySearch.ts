import { Maybe, User, QueryUsersBySearchArgs } from 'schemaTypes';
import { firebaseDocToUser } from 'utils';

const getUsersBySearch = async (
  root: any,
  args: QueryUsersBySearchArgs,
  context: AppGraphQLContext
): Promise<Maybe<User[]>> => {
  const { firestoreClient } = context;
  const { search } = args;

  const usernameQuery = await firestoreClient
    .collection('users')
    .where('username', '==', search)
    .get();

  const displayNameQuery = await firestoreClient
    .collection('users')
    .where('displayName', '==', search)
    .get();

  if (usernameQuery.empty && displayNameQuery.empty) return null;

  const usernameDocs = usernameQuery.empty ? [] : usernameQuery.docs;
  const displayNameDocs = displayNameQuery.empty ? [] : displayNameQuery.docs;

  const usernameUsers = usernameDocs.map(doc => {
    const data = doc.data();
    const user = firebaseDocToUser(doc, data);
    return user;
  });

  const displayNameUsers = displayNameDocs.map(doc => {
    const data = doc.data();
    const user = firebaseDocToUser(doc, data);
    return user;
  });

  return [...usernameUsers, ...displayNameUsers];
};

export default getUsersBySearch;
