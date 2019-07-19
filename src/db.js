const users = [{
    id: 'ert345',
    name: 'Mike',
    email: 'a@a.com',
    age: 23
}, {
    id: 'rty456',
    name: 'Sarah',
    email: 'sarah@gmail.com'
}, {
    id: '567tyu',
    name: 'James',
    email: 'james@gmail.com',
    age: 45
}];

const posts = [{
    id: 'qqq',
    title: 'Apple',
    body: 'Sweet',
    published: true,
    author: 'ert345'
}, {
    id: 'www',
    title: 'Internet',
    body: 'Addictive',
    published: false,
    author: 'rty456'
}, {
    id: 'eee',
    title: 'Fish',
    body: 'Tasty',
    published: true,
    author: 'rty456'
}];

const comments = [{
    id: '123',
    text: 'So hot',
    author: 'ert345',
    post: 'www'
}, {
    id: '234',
    text: 'So cold',
    author: 'rty456',
    post: 'www'
}, {
    id: '345',
    text: 'Hey, your post is great',
    author: '567tyu',
    post: 'eee'
}, {
    id: '456',
    text: 'What a great article!',
    author: '567tyu',
    post: 'eee'
}];

const db = { users, posts, comments };
export default db;
