import bcrypt from 'bcryptjs';


const Mutation = {
    // must follow node schema!
    async createUser(parent, { data }, { prisma }, info) {


        // with password
        if(data.password && data.password.length < 8) 
            throw new Error('The password must greater than 7 characters or letters');
       
        // bcryptjs provides "promise"
        const password = await bcrypt.hash(data.password, 10);

        // Do use this one because "email" is setup @unique in prisma
        // const emailTaken = await prisma.exists.User({ email: data.email });
        // if(emailTaken) throw new Error('Email is already taken');

        // must be mapped over a format of prisma "input"
        return await prisma.mutation.createUser({ 
            data: {
               ...data, 
               password
            } 
        }, info);

        // Without prisma
        //  const emailTaken = users.some(user => user.email === email);
        //  if(emailTaken) throw new Error('Email is already taken');
         
        //  const user = {
        //      id: uuidv4(),
        //      name,
        //      email,
        //      age
        //  }

        //  users.push(user);
        //  return user;

     },
     async updateUser(parent, { id, data }, { prisma }, info) {
        const userExist = await prisma.exists.User({ id });
        if(!userExist) throw new Error('The does not exist.');
        
        return await prisma.mutation.updateUser({
            where: { id },
            data
        }, info);
        
        // const user = users.find(user => user.id === id);
        // if(!user) throw new Error('Unable to find the user');
        
        // if(typeof name === 'string') {
        //     user.name = name;
        // }
        
        // if(typeof email === 'string') {
        //     const isEmailExisting = users.some(user => user.email === email);
        //     if(isEmailExisting) throw new Error('The email already exists.');
        //     user.email = email;
        // }

        // if(typeof age !== 'undefined') {
            
        //     if(typeof age === 'number') {
        //         user.age = age;
        //     } else {
        //         throw new Error('Invalid Input')
        //     }
        // } 
        // return user;
     },
     // !!!!!!!!!!!!!!!!!!!!!!!!!!!!  IMPORTANT !!!!!!!!!!!!!!!!!!!!1
     // client: must use node resolver's format with arg
     // prisma: must use prisma's schema format with args
     async deleteUser(parent, { id }, { prisma }, info) {
        
        const userExist = await prisma.exists.User({ id });
        if(!userExist) throw new Error ('The ID does not exist.');

        // prsma's "relation of CASCASDE and SET_NULL" automatically resolve 
        //  association issue.
        return await prisma.mutation.deleteUser({ where: { id }}, info);
        
        // Without prisma
        // const userIndex = users.findIndex(user => user.id === id );
        // if(userIndex === -1) {
        //     throw new Error('Unable to find the user');   
        // }
        
       
        // posts = posts.filter(post => {

        //     // In order to remove comment's post before the post is deleted
        //     const match = post.author === id;

        //     // remove the post first in the comment
        //     if(match) {
        //         comments = comments.filter(comment => comment.post !== post.id)
        //     }
        //     // Important !!!!!
        //     // return the array in the condition that they are not matched

        //     // Then remove the post first
        //     return !match;
        // })

        // // remove the comment
        // comments = comments.filter(comment => comment.author !== id);

        // const deletedUsers =  users.splice(userIndex, 1);

        // return deletedUsers[0];

     },
     async createPost(parent, { data: { title, body, published, author } }, { prisma, pubsub }, info) {
        const userVerified = await prisma.exists.User({ id: author });
        if(!userVerified) throw new Error('Unable to find the user.');
        
        return await prisma.mutation.createPost({
            data: {
                title,
                body,
                published,
                author: {
                    connect: {
                        id: author
                    }
                }
            }
        }, info);

        //  const userVerified = users.some(user => user.id === author);
        // if(!userVerified) throw new Error('User is required to signup');
        // prisma.mutation.createPost()
        //  const post = {
        //      id: uuidv4(),
        //      title,
        //      body,
        //      published,
        //      author
        //  }

        //  posts.push(post);
        //  if(published) pubsub.publish('post', { 
        //      // mapping it over the return type of Schema
        //      post: {
        //          mutation: 'CREATED',
        //          data: post
        //      } 
        //     });
         
        //  return post;
     },
     async updatePost(parent, { id, data: { title, body, published, author }}, { prisma, pubsub }, info) {
         
         // const userVerified = users.some(user => user.id === author)
         // if(!userVerified) throw new Error('Unable to find the user');

        const userExist = await prisma.exists.User({ id : author });
        if(!userExist) throw new Error('Unable to find the user');

        const post = await prisma.query.posts({
            where: {
                AND: [{
                    id_contains: id
                }, { 
                    author: {
                        id_contains: author
                    }
                }]
            }
        }, info);

        console.log('post ===> ', post)
        if(post.length === 0 ) throw new Error('Unable to find your post');

        return await prisma.mutation.updatePost({
            where: { id },
            data: {
                title,
                body,
                published //,
                // author cannot be modified
                // author: {
                //     connect: {
                //         id: author
                //     }
                // }
            }
        }, info);


        //  const post = posts.find(post => post.id === id);
        //  const originalPost = { ...post };

        //  if(!post) throw new Error('Unable to find the post');

        //  if(typeof title === 'string') {
        //     post.title = title;
        //  }

        //  if(typeof body === 'string') {
        //      post.body = body;
        //  }

         // newly updating "published" field from the client 
        //  if(typeof published !== 'undefined' && typeof published === 'boolean') {
            
        //      console.log('boolean')
        //      post.published = published;

        //      // post.published => new post by up and above "post.published = published;
        //      if(originalPost.published && !post.published) {
        //          // deleted;
        //          console.log('deleted')
        //          pubsub.publish('post', { post: {
        //              mutation: 'DELETED',
        //              data: originalPost
        //          }});

        //      } else if(!originalPost.published && post.published) {
        //          // created
        //          console.log('created')
        //          pubsub.publish('post', { post: {
        //              mutation: 'CREATED',
        //              data: post
        //          }});
        //      }
        //  // in case of update, we must not put "published value"
        //  // the original / exsiting post.published
        //  } else if(post.published) {
        //      console.log('published === undefined', published)
        //     // updated
        //     console.log('updated')
        //     pubsub.publish('post', { post: {
        //         mutation: 'UPDATED',
        //         data: post
        //     }});
        //  }

        //  return post;
     },
     async deletePost(parent, { id }, { prisma, pubsub }, info) {

        const postExist = await prisma.exists.Post({ id });
        if(!postExist) throw new Error('Unable to find the post');

        return await prisma.mutation.deletePost({
            where: { id }
        }, info);


        // const postIndex = posts.findIndex(post => post.id === id);
        // if(postIndex === -1) throw new Error('Unable to find the post');

        // comments = comments.filter(comment => comment.post !== id);

        // ES5
        // const deletedPosts = posts.splice(postIndex, 1);            

        //ES6
        // const [ post ] = posts.splice(postIndex, 1); 

        // deleted notification
        // if(post.published) {
        //     pubsub.publish('post', { post: {
        //         mutation: 'DELETED',
        //         data: post
        //     }})
        // }

        // return post;
        // return deletedPosts[0];

     },
     async createComment(parent, { data: { text, post, author }}, { prisma, pubsub }, info) {
        const postVerified = await prisma.exists.Post({ id: post });
        if(!postVerified) throw new Error('Unable to find the post');
        const userVerified = await prisma.exists.User({ id: author });
        if(!userVerified) throw new Error('Unable to find the user');
    
        return await prisma.mutation.createComment({
           data: {
               text,
               author: {
                   connect: {
                       id: author
                   }
               },
               post: {
                   connect: {
                       id: post
                   }
               }
           } 
        }, info);
        
        // const postVerifed = posts.some(each_post => each_post.id === post && each_post.published);
         // const userVerified = users.some(user => user.id === author);
         
        //  if(!postVerifed || !userVerified) throw new Error('User or Post is not available.');

        //  const comment = {
        //      id: uuidv4(),
        //      text,
        //      post,
        //      author
        //  }

        //  comments.push(comment);
        //  post (postId) must areadly exist.!!
        //  On a basis of this state, we can use subscription,
        //     because the pubsub.asyncIterator is setup to find the existing postId
        
        //  pubsub.publish(`comment ${ post }`, {
        //      comment: {
        //          mutation: 'CREATED',
        //          data: comment
        //      }
        //  });

        //  return comment;
     },
     deleteComment(parent, { id }, { prisma , pubsub }, info) {
        return prisma.mutation.deleteComment({
            where: { id }
        }, info);


        // const commentIndex = comments.findIndex(comment => comment.id === id);
        // if(commentIndex === -1) throw new Error('Unable to find the comment');
        // const [ comment ] = comments.splice(commentIndex, 1);

        // pubsub.publish(`comment ${ comment.post }`, { 
        //     comment: {
        //         mutation: 'DELETED',
        //         data: comment
        //     }
        // })

        //  return comment;
     },
     async updateComment(parent, { id, data: { text, author, post } }, { prisma, pubsub }, info) {
        
        const isUserVerified = await prisma.exists.User({ id: author });
        const isPostExisting = await prisma.exists.Post({ id: post});
        if(!isUserVerified || !isPostExisting) throw new Error('The user or post is not available.');

        const authority = await prisma.query.comments({
            AND: [{
                id
            }, {
                author: {
                    contains_id: author
                }
            }, {
                post: {
                    contains_id: post
                }
            }]
            // where: {
            //     id,
            //     AND: [{
            //       author: {
            //           id_contains: author
            //       }  
            //     }, {
            //       post: {
            //           id_contains: post
            //       }
            //     }]
            // }
        }, info);

        console.log('authority: ', authority)
        if(authority.length === 0) throw new Error('Unable to find your comment');

        return await prisma.mutation.updateComment({
            where: { id },
            data: {
                text,
                author: {
                    connect: {
                        id: author
                    }
                },
                post: {
                    connect: {
                        id: post
                    }
                }
            }
        }, info)

        //  const isUserVerified = users.some(user => user.id === author);
        //  if(!isUserVerified) throw new Error('Unable to find the user');

        //  const isPostExisting = posts.some(each_post => each_post.id === post);
        //  if(!isPostExisting) throw new Error('Unable to find the post');

        //  const comment = comments.find(comment => comment.id === id);
        //  if(!comment) throw new Error('Comment is not availalbe!');

        //  if(typeof text === 'string') {
        //      comment.text = text;
        //      pubsub.publish(`comment ${ post }`, { 
        //          comment: {
        //              mutation: 'UPDATED',
        //              data: comment
        //          }
        //     });
        //  }

        //  return comment;
     }
}

export { Mutation };