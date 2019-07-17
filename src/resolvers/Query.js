const Query = {
    users(parent,{ query }, { db, prisma }, info) {
        // 1) When the second arg is nothing
        // prisma will grap default data
        //  showing all fields.
        // However, it will not return custom type data!!
        // prisma.query.users(null, '{}')
        // prisma.query.users(null, null)
        // prisma.query.users(null);

        // 2) When the second arg is object 
        // it receives "info"arguement of resolver
        // "info" contains the original operation which exists in iOS / web browser
        // including for instance screen sizes or web browser types
        
        console.log('info ========> ', )
        return prisma.query.users(null, info)
        
        // if(!query) return users;

        // return users.filter(user => 
        //     user.name.toLowerCase().includes(query.toLowerCase()));

    },
    posts(parent, { query }, { db: { posts }}, info) {
        if(!query) return posts;
        
        return posts.filter(post => {
            const isTitleMatched = post.title.toLowerCase().includes(query.toLowerCase());
            const isBodyMatched = post.body.toLowerCase().includes(query.toLowerCase());
            return isTitleMatched || isBodyMatched;
        });
    },
    comments(parent, args, { db: { comments }}, info) {
        return comments;
    },
    me(parent, args, ctx, info) {
        return {
            id: 'ttt',
            name: 'Alex',
            email: 'alex@example.com',
            age: 23
        }
    },
    post(parent, args, ctx, info) {
        return {
            id: 'aaa',
            title: 'Awesome you',
            body: 'hahahaha',
            published: false
        }
    }
}

export { Query };