declare module '*.graphql' {
  import { DocumentNode } from 'graphql';

  const content: DocumentNode;
  export default content;
}

declare type AppGraphQLContext = {
  userID: string;
  firestoreClient: FirebaseFirestore.Firestore;
};
