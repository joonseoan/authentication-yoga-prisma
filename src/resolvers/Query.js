import getUserId from '../utils/getUserId';

const Query = {
    users(parent, { query }, { prisma }, info) {

        // [ definition of prisma query and its args ]
        // 1) When the second arg is nothing
        // prisma will grap default data
        //  showing all fields.
        // However, it will not return custom type data!!
        // prisma.query.users(null, '{}')
        // prisma.query.users(null, null)
        // prisma.query.users(null);

        // 2) When the second arg is object 
        // it receives "info" arguement of resolver
        // "info" contains the original operation which exists in iOS / web browser
        //      most inportantly it contails all of types, queries and mutations info
        

        // info: 
        // console.log(JSON.stringify(info, undefined, 4))

        //2) with args
        const opArgs = {};
        // if we want to use the query as "name"
        if(query) {
            opArgs.where = {

                // 3)
                // AND: we can query data by using a string and a group of letters or characters
                // Two conditions down below must be satisfied.
                AND: [{
                    name_contains: query
                }, {
                    email_contains: query
                }]                 
                
                // 2)
                // OR: either of one.
                // AND: we can query data by using a string and a group of letters or characters
                //      letters or character in an argument   
                // Must use array
                // OR: [{
                //     name_contains: query
                // }, {
                //     email_contains: query
                // }]

                // 1)
                // define if a particular name's string/letter exists
                // name_contains: query
            }
        }

        return prisma.query.users(opArgs, info);

        // 1) prisma query without args
        //  console.log('info ========> ', info )
        //  return prisma.query.users(null, info)
        // return prisma.query.users(null, info)
        //     .then(users => {
        //         console.log('users: ', JSON.stringify(users, undefined, 4))
        //         return users
        //     })
        

        // When only uses "yoga"
        // return prisma.query.users(null, '{ id name email }')
        
        // if(!query) return users;

        // return users.filter(user => 
        //     user.name.toLowerCase().includes(query.toLowerCase()));

    },
    // Challenge
    myPosts(parent, { query }, { prisma, request }, info) {
        const userId = getUserId(request);
        const opArgs = {
            where: {
                author: {
                    id: userId
                }
            }
        };
        if(query) {
            opArgs.where.OR = [{
                title_contains: query
            }, {
                body_contains: query
            }] 
        }
        const posts = prisma.query.posts(opArgs, info);
        if(posts.length === 0) throw new Error('Your posts are not availabl.');
        
        return posts;
    },
    posts(parent, { query }, { prisma }, info) {

        // For all users, the posts published only can be accesses.
        const opArgs = {
            where: {
                published: true
            }
        };

        // get posts that are matched with query string, out of posts 
        //  which have published true
        if(query) {
            opArgs.where.OR = [{
                title_contains: query
            }, {
                body_contains: query
            }]
        };

        return prisma.query.posts({ opArgs, info});
        
        
        // With the first arg
        // const opArgs = {};

        // if(query) {
        //     opArgs.where = {
        //         AND: [{
        //             published: false
        //         }, {
        //             author: {
        //                 name_contains: query
        //             }
        //         }]
        //     }
        // }

        return prisma.query.posts(opArgs, info);

        
        // 1) Without the first arg
        // return prisma.query.posts(null, info);

        

        // Without prisma
        // if(!query) return posts;
        
        // return posts.filter(post => {
        //     const isTitleMatched = post.title.toLowerCase().includes(query.toLowerCase());
        //     const isBodyMatched = post.body.toLowerCase().includes(query.toLowerCase());
        //     return isTitleMatched || isBodyMatched;
        // });
    },
    // fully public therefore, any one can access to all comments
    comments(parent, args, { prisma }, info) {
        const opArgs = {};

        return prisma.query.comments(opArgs, info);

        // return comments;
    },
    async me(parent, args, { prisma, request }, info) {
        
        const userId = getUserId(request);
        const user = await prisma.query.user({
            where: { id: userId }
        }, info);

        if(!user) throw new Error('Unable to find the user');

        return user;
    },
    async post(parent, { id }, { prisma, request }, info) {
        // IMPORTANT!!!!!!!!!!!!!!!!!!!!!!
        // "false": arbituary it skips "requireAuth === false";
        //      even though token is not available.

        // The user without login (without token) is still able to get 
        //  published post.
        const userId = getUserId(request, false);
        
        // From this line, without authentication, it must not work.

        // Important. In prisma playground has a singular "post"!!!!
        // However, it has a limitation that the condition, "where" has a single field.
        // Only "id" can be compared.

        // In the other hand, multiple "posts" has different fields.
        //  Therfore, we can define different conditions.

        const [ post ] = await prisma.query.posts({
            where: {
                id,
                /* 
                    Scenario: 1) published === true <=== it can be accessed by any persion
                              2) published === false <=== it can be accessed only by the author 
                
                */
                OR: [{
                    published: true
                }, {
                    author: {
                        // userId must not be "undefined" ===> error!!!!
                        id: userId
                    }
                }]
            }
        }, info);

        if(!post) throw new Error('Unabl to find the post');

        return post;       
    }
}

export default Query;