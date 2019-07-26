const Post = {

    // "prisma" will automatically do this by directly working graphql and database!!!
    // Once we use mongoose or schema, it is not possible!!!!

    // author(parent, args, { db: { users }}, info) {
    //     return users.find(user => user.id === parent.author);
    // },
    // comments(parent, args, { db: { comments }}, info) {
    //     return comments.filter(comment => comment.post === parent.id);
    // }
}

export default Post;