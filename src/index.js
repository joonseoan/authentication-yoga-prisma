// PubSub: Subscription lib by using socket.io
import { GraphQLServer, PubSub } from 'graphql-yoga';

import db from './db';
import { Query, Mutation, Subscription, User, Post, Comment } from './resolvers';
import prisma from './prisma';

const pubsub = new PubSub();

const server = new GraphQLServer({
    // must exist even if we use prisma model.
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment
    },
    context: {
        db,
        pubsub,
        prisma
    }
});

server.start(() => console.log('Authentication!'));