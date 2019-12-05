import { User } from 'schemaTypes';

const firebaseDocToUser = (
  doc: FirebaseFirestore.DocumentSnapshot,
  data: FirebaseFirestore.DocumentData
): User => ({
  id: doc.id,
  about: data.about ?? {},
  username: data.username,
  displayName: data.displayName
});

export { firebaseDocToUser };
