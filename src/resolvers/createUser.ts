import { MutationCreateUserArgs, CreateUserPayload } from 'schemaTypes';
import getUserById from './getUserById';
import { attributeToSearchableText } from 'utils';

const createUser = async (
  root: any,
  args: MutationCreateUserArgs,
  context: AppGraphQLContext
): Promise<CreateUserPayload> => {
  const { user } = args.input;
  const { firestoreClient } = context;

  const userInput = {
    username: user.username,
    displayName: user.displayName,
    email: user.email,
    about: user.about ?? null,
    _username: attributeToSearchableText(user.username),
    _displayName: attributeToSearchableText(user.displayName)
  };

  const usersCollection = firestoreClient.collection('users');

  let id = user.id ?? '';
  // create from auth0 id
  if (user.id) {
    await usersCollection.doc(user.id).set(userInput);
  } else {
    // create user with autoid (testing)
    const addUserRef = await firestoreClient.collection('users').add(userInput);
    id = addUserRef.id;
  }

  const createdUser = await getUserById({}, { id }, context);

  if (!createdUser) return { user: null };

  const createUserPayload: CreateUserPayload = {
    user: createdUser
  };

  return createUserPayload;
};

export default createUser;
