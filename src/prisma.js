// Creating Prisma End Point

import { Prisma } from 'prisma-binding';
import { fragmentReplacements } from './resolvers';

const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://192.168.99.100:4466',
    secret: 'mysupersecrettext',
    fragmentReplacements
});

export default prisma;

// [ Query ]
// 1. Simple Query
// "Prisma" itself creates querys when we create custom type schema.
// when we do not need to put args
// prisma.query.users(null,'{ id name }')
//     .then(users => console.log(users));

// 2. Query with associations
// // fetching custom type (associated data) inside of a query
// prisma.query.users(null, '{ id name posts { id title} }')
//     .then(users => {
//         console.log(JSON.stringify(users, undefined, 4))
//     });

// prisma.query.comments(null, '{ id, text author { id, name } post { id title body }}')
//     .then(comments => console.log(JSON.stringify(comments, undefined, 4)));

// [ Mutation ]
// prisma.mutation.createPost({
//     data: {
//         title: "GraphQL SetUp",
//         body: "You can find a new course",
//         published: true,
//         author: {
//             connect: {
//                 id: "cjy0ytnjo001n0757pue36cpp"
//             }
//         }
//     }
// }, '{ id, title, body, published, author { id, name } }')
//     .then(post => console.log(JSON.stringify(post, undefined, 4)));

// [ Query after Mutation ]
// prisma.mutation.createPost({
//     data: {
//         title: "GraphQL SetUp",
//         body: "You can find a new course",
//         published: true,
//         author: {
//             connect: {
//                 id: "cjy0ytnjo001n0757pue36cpp"
//             }
//         }
//     }
// }, '{ id, title, body, published, author { id, name } }')
//     .then(posts => {
//         console.log(JSON.stringify(posts, undefined, 4));
//         return prisma.query.users(null, '{ id, name, email, posts { id, title, body, published }}')    
//     })
//     .then(users => console.log(JSON.stringify(users, undefined, 4)));


// [ Query after Update ]
// prisma.mutation.updatePost({
//     data: {
//         title: "Prisma is great",
//         body: "Prisma is really easy",
//         published: false
//     },
//     where: {
//         id: "cjy285utq001t0757xqvb176a"
//     }
// }, '{ id, title, body, published, author { id name email }}')
//     .then(post => {
//         console.log(JSON.stringify(post, undefined, 4));
//         return prisma.query.users(null, '{ id name, email, posts { title }}');
//     })
//     .then(users => console.log(JSON.stringify(users, undefined, 4)));


// [ By using Async/Wait ]
// 1. create a new post
// 2. Fetch all of the info about the users

// Exist method of prisma
// For instance, if we would like to know wheathor or not
//  a specifc comment exists exist.Comment({ id: 'id'})
// Plese, note "Comment" starts with upperletter

// And also, we can put any other criteria to fid out it exist.
// prisma.exists.Comment({ 
//     id: 'cjy37zx56001p07572i9fix11',
//     text : 'Hahahaha',
//     author: {
//         id: "cjy0ytnjo001n0757pue36cpp"
//     }
// })
//     .then(result => console.log(result));


// const createPostForUser = async (authorId, data) => {
//     // Adding exist method
//     const userExist = await prisma.exists.User({ id: authorId }); 
//     if(!userExist) throw new Error('Unable to find the user');

//     const post = await prisma.mutation.createPost({
//         data: { ...data, author: { connect: { id: authorId }}},
//     }, '{ author { id name email posts { id title body published }}}');

//     // One single user / Uncessary
//     // const user = await prisma.query.user({
//     //     where: { id: authorId }
//     // }, '{ id, name, email posts { id title body published }}');

//     return post.author;
// }

// createPostForUser('cjy0ytnjo001n0757pue36cpp', {
//     title: 'When can I apply',
//     body: 'I might not take a too long!!!',
//     published: true
// })
// // because createPostForUser is a promise.
// .then(user => console.log('user: ', JSON.stringify(user, undefined, 4)))
// // Do not forget check out the error
// .catch(e => console.log(e.message));

// const updatePostForUser = async (id, data) => {

//     const postExist = await prisma.exists.Post({ id });
//     if(!postExist) throw new Error('Unable to find the post');
    
//     const post = await prisma.mutation.updatePost({
//         data,
//         where: {
//            id
//         }
//     },'{ author { id, name, email, posts { id title body published }}}');

//     return post.author


    // Unecessary
    // console.log('post: ', post)
    // return await prisma.query.user({
    //     // must specify author which is the first field of  'author {id} up and above'
    //     where: { id: post.author.id }
    // }, '{ id, name, email, posts { id, title, body, published }}')
    
// }

// updatePostForUser('cjy36it4d00090757euqyg74t', {
//     title: 'Hot Sunday',
//     body: 'I wanna work out, by the way',
//     published: false
// })
// .then(user => console.log(JSON.stringify(user, undefined, 4)))
// .catch(e => console.log(e.message));



// [ Query ]
// 1. Simple Query
// "Prisma" itself creates querys when we create custom type schema.
// when we do not need to put args
// prisma.query.users(null,'{ id name }')
//     .then(users => console.log(users));

// 2. Query with associations
// // fetching custom type (associated data) inside of a query
// prisma.query.users(null, '{ id name posts { id title} }')
//     .then(users => {
//         console.log(JSON.stringify(users, undefined, 4))
//     });

// prisma.query.comments(null, '{ id, text author { id, name } post { id title body }}')
//     .then(comments => console.log(JSON.stringify(comments, undefined, 4)));

