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
    posts(parent, { query }, { prisma }, info) {

        // With the first arg
        const opArgs = {};
        if(query) {
            opArgs.where = {
                AND: [{
                    published: false
                }, {
                    author: {
                        name_contains: query
                    }
                }]
            }
        }

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
    comments(parent, args, { prisma }, info) {

        const opArgs = {};

        

        return prisma.query.comments(opArgs, info);

        // return comments;
    }
    // me(parent, args, ctx, info) {
    //     return {
    //         id: 'ttt',
    //         name: 'Alex',
    //         email: 'alex@example.com',
    //         age: 23
    //     }
    // },
    // post(parent, args, ctx, info) {
    //     return {
    //         id: 'aaa',
    //         title: 'Awesome you',
    //         body: 'hahahaha',
    //         published: false
    //     }
    // }
}

export { Query };