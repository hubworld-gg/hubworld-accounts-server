import { Maybe, User, QueryUsersBySearchArgs } from 'schemaTypes';
import { firebaseDocToUser, getStartsWithCodes } from 'utils';

const getUsersBySearch = async (
  root: any,
  args: QueryUsersBySearchArgs,
  context: AppGraphQLContext
): Promise<Maybe<User[]>> => {
  const { firestoreClient } = context;
  const { search } = args;

  const { startcode, endcode } = getStartsWithCodes(search.toLowerCase());

  const usernameQuery = await firestoreClient
    .collection('users')
    .where('_username', '>=', startcode)
    .where('_username', '<', endcode)
    .get();

  const displayNameQuery = await firestoreClient
    .collection('users')
    .where('_displayName', '>=', startcode)
    .where('_displayName', '<', endcode)
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

  const userList = [...usernameUsers, ...displayNameUsers].filter(
    (user, index, self) => index === self.findIndex(u => u.id === user.id)
  );

  return userList;
};

export default getUsersBySearch;
