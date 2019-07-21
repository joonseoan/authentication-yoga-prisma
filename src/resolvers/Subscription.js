const Subscription = {
    comment: {
        subscribe(parent, { postId }, { prisma }, info) {

            // prisma subscription with args for particular post
            return prisma.subscription.comment({
                where: {
                    node: {
                        post: {
                            id: postId
                        }
                    }
                }
            }, info);

            // Please, note that prisma's payload object must be line with
            //  node-based graphql schema's payload (return) type
            //  for node to undertand and deliver the payloyad value to
            //  the client.

            /* Prisma Subscriptio Schema in 192.168.99.100 */
            /* 
                comment(
                    where: CommentSubscriptionWhereInput
                ): CommentSubscriptionPayload

                return type

                type CommentSubscriptionPayload {
                    mutation: MutationType!
                    node: Comment ===> different
                    updatedFields: [String!]
                    previousValues: CommentPreviousValues
                }
                
                where: CommentSubscri
            */

            // However, the subscription in node,
            /* 
                # Challenge
                type CommentSubscriptionPayload {
                    mutation: MutationType!
                    data: Comment! ===> different
                }
            */


            // We change subscription payload!!!

            // prisma subscription without args
            // prisma by using info konws which data was just changed
            //  Therefore, we do not need to set it up like the one below.
            // return prisma.subscription.comment(null, info);

            // Without prisma
            // const post = posts.find(post => post.id === postId && post.published);
            // if(!post) throw new Error('Unable to find the post');            
            // return pubsub.asyncIterator(`comment ${ postId }`);
        }
    },
    post: {
        subscribe(parent, args, { prisma }, info) {

            return prisma.subscription.post({
                where: {
                    node: {
                        // only data for "published" updated to "true"
                        published: true
                    }
                }
            }, info);


            // with Prisma
            // return pubsub.asyncIterator('post');
        }
    }

}

export { Subscription };