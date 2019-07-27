import getUserId from '../utils/getUserId';

// Schema resolver is still required
//  even though we use info
const User = {
        /* 
            [ I M P O R T A N T !!!!!!!!!!!!]
            1)
            "parent.id" or "parent value"!!!
            -  the field value we are required to be imported and placed in the resolvers
                must be requested from the client.
            - Otherwise, it returns null!!!

            2) In order to prevent the client request the unnecessary data for the rending
            we can use "Fragment"

            [ Fragment setup in the client side ]
            
            # fields value that will return to the client

            query {
                users {
                    ...userFields
                    posts {
                    id
                    title
                    }
                
                }
            }

            # Data for manipulation inside of resolvers
            # since fragment definition, the clients do not need to
            # 	request the field value only for manipulation inside of the server
            # fragment will automatically fetch the field values whcih are "parent"
            # 	then the resolvers will manipulate it.

            fragment userFields on User {
                id
                name
                email
            }

        */
        
    // must use a plain object to use "fragment"

    // 1)
    // email({ id, email }, args, { request }, info) {

    // 2)
    email: {

        // defining a field, "id" for manipulation down below.
        fragment: 'fragment userId on User { id }',
        resolve({ id, email }, args, { request }, info) {
            
            // logic
            // compares the parent's user "id" vs token 
            //  to display email only for the ownder 

            // It decides wheather or not we send the email back 
            // Important!!! controling the single scalar type!!!!
            
            // "false" is to diffferentiate the unauthenticated users
            const userId = getUserId(request, false);

            /* 
            [Data Comparison]
                ["users" pural]
                userId:  cjyf6cg2t0005075776s80sws
                cjy9guf7200150757iypx6l9b
                userId:  cjyf6cg2t0005075776s80sws
                cjyav2iyd000407573j4pflpo
                userId:  cjyf6cg2t0005075776s80sws
                cjyaxi5hh001e0757oporftln
                userId:  cjyf6cg2t0005075776s80sws
                cjyaxii39001k07579n3dq6ue
                userId:  cjyf6cg2t0005075776s80sws
                cjyc6zndn002j0757kgww5bqt
                userId:  cjyf6cg2t0005075776s80sws
                cjycdnqa6009n075739wb8zn3
                userId:  cjyf6cg2t0005075776s80sws
                cjydbgqsh00040757jb4nrmgl
                userId:  cjyf6cg2t0005075776s80sws
                cjydi32md00180757ayzjfv5g
                userId:  cjyf6cg2t0005075776s80sws
                cjyf6cg2t0005075776s80sws
                userId:  cjyf6cg2t0005075776s80sws
            
            */
            // Compare single by single email

            // console.log(id)
            // console.log('userId: ', userId)
            
            

            // By using fragment, id value is fetched for this comparison
            //      without the client's this "id" request!!!!
            if (userId && userId === id) {
                return email;
            }

            return null;
        }
    },

        // challenge
    posts: {
        // defnining the parent field to be fetched only for manipulation
        fragment: 'fragment userIdField on User { id }',
        resolve({ id }, args, { prisma }, info) {

            // Once weu use if statement like the below, 
            //  "false" condition users are not able to generate 
            //  "posts" fields. Instead, it returns "null" which viloates the schema.

            // const userId = getUserId(request, false);
            // if(userId && userId === id) {
                
                // return prisma.query.posts({
                //     where: {
                //         published: true,
                //         author: { id }
                //     }
                // }, info)
            // }

            // if the where condition is not required,
            //  we do not need to specify this function.

            return prisma.query.posts({
                where: {
                    published: true,
                    author: { id }
                }
            }, info)

           
        }

    }
    

        




    

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

export default User;