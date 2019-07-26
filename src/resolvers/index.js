// export * from './Query';
// export * from './Mutation';
// export * from './User';
// export * from './Post';
// export * from './Comment';
// export * from './Subscription';

// For using "Fragment"
// we need to configure resolvers to pass through both graphql yoga and prisma (prisma.js)
//  which has a prisma calss.!!!!
// Therefore, we need to separately define the resolver here instead of project's "index.js"
import { extractFragmentReplacements } from 'prisma-binding';

import Query from './Query';
import  Mutation from './Mutation';
import User from './User';
import Post from './Post';
import Comment from './Comment';
import Subscription from './Subscription';

const resolvers = { Query, Mutation, User, Post, Comment, Subscription };

// fragmentReplacements : import fragment into each resolver function.
const fragmentReplacements = extractFragmentReplacements(resolvers);

export { resolvers, fragmentReplacements } ;
