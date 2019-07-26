// PubSub: Subscription lib by using socket.io
import { GraphQLServer, PubSub } from 'graphql-yoga';

import db from './db';
import { resolvers, fragmentReplacements } from './resolvers';
import prisma from './prisma';

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    // context is a kind of "redux or context" in react.
    // It contains custom data being passed through your
    //  resolver chian. This can be passed in as an object or
    //  as a Functin with the signature (reg: contextParameters )!!!!
    //2) funcitonal object

    // request can be passed through context!
    context(request) {
        // request contains values of the client's req like express server.
        // console.log(request)
        return {
            db,
            pubsub,
            prisma,
            request
        }
    },
    fragmentReplacements
    // 1)
    // context: {
    //     db,
    //     pubsub,
    //     prisma
    // }
});

server.start(() => console.log('Authentication!'));