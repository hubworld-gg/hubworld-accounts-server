import { MutationCreateUserArgs, CreateUserPayload } from 'schemaTypes';
import getUserById from './getUserById';

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
    about: user.about ?? null
  });

  const createdUser = await getUserById({}, { id: addUserRef.id }, context);

  if (!createdUser) return { user: null };

  const createUserPayload: CreateUserPayload = {
    user: createdUser
  };

  return createUserPayload;
};

export default createUser;
