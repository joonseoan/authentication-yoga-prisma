
// Schema resolver is strill required
//  even though we use info
const User = {

    // with prisma ===> nothing
    // because prisma applys the down below automatically by implementing info!!!

    // Without prisma
    // posts(parent, args, { db: { posts }}, info) {
    //     return posts.filter(post => post.author === parent.id);
    // },
    // comments(parent, args, { db: { comments }}, info) {
    //     return comments.filter(comment => comment.author === parent.id);
    // }
}

export { User };