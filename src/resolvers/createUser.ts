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

  const addUserRef = await firestoreClient.collection('users').add({
    username: user.username,
    displayName: user.displayName,
    about: user.about ?? null,
    _username: attributeToSearchableText(user.username),
    _displayName: attributeToSearchableText(user.displayName)
  });

  const createdUser = await getUserById({}, { id: addUserRef.id }, context);

  if (!createdUser) return { user: null };

  const createUserPayload: CreateUserPayload = {
    user: createdUser
  };

  return createUserPayload;
};

export default createUser;
