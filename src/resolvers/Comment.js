const Comment = {
    post(parent, args, { db: { posts }}, info) {
        return posts.find(post => post.id === parent.post);

    },
    author(parent, args, { db: { users }}, info) {
        return users.find(user => user.id === parent.author)
    }
}

export { Comment };