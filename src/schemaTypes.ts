import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  _FieldSet: any,
};






export type About = {
   __typename?: 'About',
  description?: Maybe<Scalars['String']>,
  socialAccounts?: Maybe<Array<SocialLink>>,
};

export type AboutInput = {
  description?: Maybe<Scalars['String']>,
  socialAccounts?: Maybe<Array<SocialAccountInput>>,
};

export type CreateUserInput = {
  user: UserInput,
};

export type CreateUserPayload = {
   __typename?: 'CreateUserPayload',
  user?: Maybe<User>,
};

export enum LinkType {
  Twitch = 'TWITCH',
  Mixer = 'MIXER',
  Discord = 'DISCORD',
  Youtube = 'YOUTUBE',
  Facebook = 'FACEBOOK',
  Steam = 'STEAM',
  Origin = 'ORIGIN',
  Uplay = 'UPLAY',
  Battlenet = 'BATTLENET',
  Riot = 'RIOT',
  Plain = 'PLAIN'
}

export type Mutation = {
   __typename?: 'Mutation',
  createUser?: Maybe<CreateUserPayload>,
};


export type MutationCreateUserArgs = {
  input: CreateUserInput
};

export type Query = {
   __typename?: 'Query',
  me?: Maybe<User>,
  userById?: Maybe<User>,
  userByEmail?: Maybe<User>,
  usersBySearch?: Maybe<Array<User>>,
  userByUsername?: Maybe<User>,
};


export type QueryUserByIdArgs = {
  id: Scalars['ID']
};


export type QueryUserByEmailArgs = {
  email: Scalars['String']
};


export type QueryUsersBySearchArgs = {
  search: Scalars['String']
};


export type QueryUserByUsernameArgs = {
  username: Scalars['String']
};

export type SocialAccountInput = {
  type: LinkType,
  url: Scalars['String'],
  name: Scalars['String'],
};

export type SocialLink = {
   __typename?: 'SocialLink',
  type: LinkType,
  url: Scalars['String'],
  name: Scalars['String'],
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  displayName: Scalars['String'],
  username: Scalars['String'],
  email: Scalars['String'],
  about: About,
};

export type UserInput = {
  id?: Maybe<Scalars['ID']>,
  displayName: Scalars['String'],
  username: Scalars['String'],
  email: Scalars['String'],
  about?: Maybe<AboutInput>,
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type ReferenceResolver<TResult, TReference, TContext> = (
      reference: TReference,
      context: TContext,
      info: GraphQLResolveInfo
    ) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  User: ResolverTypeWrapper<User>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  About: ResolverTypeWrapper<About>,
  SocialLink: ResolverTypeWrapper<SocialLink>,
  LinkType: LinkType,
  Mutation: ResolverTypeWrapper<{}>,
  CreateUserInput: CreateUserInput,
  UserInput: UserInput,
  AboutInput: AboutInput,
  SocialAccountInput: SocialAccountInput,
  CreateUserPayload: ResolverTypeWrapper<CreateUserPayload>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  User: User,
  ID: Scalars['ID'],
  String: Scalars['String'],
  About: About,
  SocialLink: SocialLink,
  LinkType: LinkType,
  Mutation: {},
  CreateUserInput: CreateUserInput,
  UserInput: UserInput,
  AboutInput: AboutInput,
  SocialAccountInput: SocialAccountInput,
  CreateUserPayload: CreateUserPayload,
  Boolean: Scalars['Boolean'],
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  userById?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByIdArgs, 'id'>>,
  userByEmail?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByEmailArgs, 'email'>>,
  usersBySearch?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType, RequireFields<QueryUsersBySearchArgs, 'search'>>,
  userByUsername?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserByUsernameArgs, 'username'>>,
}>;

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['User']>, { __typename: 'User' } & Pick<ParentType, 'id'>, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  about?: Resolver<ResolversTypes['About'], ParentType, ContextType>,
}>;

export type AboutResolvers<ContextType = any, ParentType extends ResolversParentTypes['About'] = ResolversParentTypes['About']> = ResolversObject<{
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  socialAccounts?: Resolver<Maybe<Array<ResolversTypes['SocialLink']>>, ParentType, ContextType>,
}>;

export type SocialLinkResolvers<ContextType = any, ParentType extends ResolversParentTypes['SocialLink'] = ResolversParentTypes['SocialLink']> = ResolversObject<{
  type?: Resolver<ResolversTypes['LinkType'], ParentType, ContextType>,
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createUser?: Resolver<Maybe<ResolversTypes['CreateUserPayload']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>,
}>;

export type CreateUserPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['CreateUserPayload'] = ResolversParentTypes['CreateUserPayload']> = ResolversObject<{
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Query?: QueryResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
  About?: AboutResolvers<ContextType>,
  SocialLink?: SocialLinkResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  CreateUserPayload?: CreateUserPayloadResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
