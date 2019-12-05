import { User, Maybe } from 'schemaTypes';
import getUserById from './getUserById';

const getUserReference = async (
  userReference: {
    __typename: 'User';
  } & Pick<User, 'id'>,
  context: AppGraphQLContext
): Promise<Maybe<User>> => {
  const { id } = userReference;

  return getUserById({}, { id }, context);
};

export default getUserReference;
