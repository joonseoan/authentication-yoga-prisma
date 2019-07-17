
// IMPORTANT!!!
// Subscriptions resolvers are not a function, but "an object" with subscribe method, that returns AsyncIterable.
// So "count" or any other key value must be placed

// Usage: 1) Notification
//        2) Automatic Update
const Subscription = {
    // [ It is important! ]
    // count: {
    //     // basically, it could be 
    //     // subscribe: {} format. It is an ES16 format.
    //     subscribe(parent, args, { pubsub }, info) {
    //         let count = 0;

    //         setInterval(() => {
    //             count++;
    //             // publish: publshing channel's value that is setup by asyncIterator
    //             // 'count': channel name
    //             pubsub.publish('count', {
    //                 // 'count' is a field name of Subscription: "count" of "Subscription" object
    //                 count
    //             })
    //         }, 1000);

    //         // asyncIterator: setting up channel.
    //         // It is like a "on" socket. Litent to `comment postId'
    //         return pubsub.asyncIterator('count');
          
    //     }
    // },
    comment: {
        subscribe(parent, { postId }, { db: { posts }, pubsub }, info) {
            const post = posts.find(post => post.id === postId && post.published);
            if(!post) throw new Error('Unable to find the post');
            
            // setup up the channel with postId 
            // Then we need to setup publish when the new comment is created.
            // It is like a "on" socket. Litent to `comment postId'

            // postId is the one of the exsisting post IDs
            return pubsub.asyncIterator(`comment ${ postId }`);
        }
    },
    post: {
        subscribe(parent, args, { pubsub }, info) {
            return pubsub.asyncIterator('post');
        }
    }

}

export { Subscription };