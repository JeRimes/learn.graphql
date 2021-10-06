const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  scalar Date
  
  #input user
  input UserInput {
    id: Int!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }

  #input post
  input PostInput{
    id: Int
    content: String!
    createdAt: String
    updatedAt: String
  }
  #Create model User 
  type User{
    id: Int!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
  }
  type Post{
    id: Int
    author: User
    comments: Post
    content: String
    createdAt: String
    updatedAt: String
  }
  type Query {
    users: [User]
    posts: [Post]
  }
  #, input: UserInput!,  inputComment:PostInput
  type Mutation{
    createUser(input: UserInput!):User
    createPost(inputPost: PostInput!):Post
  }
`;

const users = [
    {
      id: 1,
      email: "laalala@gmail.com",
      password: "aaaaaa",
      firstName: "Pierre",
      lastName: "le-sang",
    },
];

const posts = [
  {
    id: 1,
    content: "Bonjour !!",
    createdAt: "06/10/2021",
    updatedAt: "06/10/2021",
  },
];
function createUser(event, args){
  const fs = require('fs');
  const fileName="bdd.json"
  const data = fs.readFileSync(fileName);
  var dataParse = JSON.parse(data);
  const users = dataParse.users;
  console.log(dataParse.users);
  users.push(args.input);
  fs.writeFileSync(fileName,JSON.stringify(dataParse,null,4));
}
function createPost(event, args){
  const fs = require('fs');
  const fileName="bdd.json"
  const data = fs.readFileSync(fileName);
  var dataParse = JSON.parse(data);
  const posts = dataParse.posts;
  console.log(args.inputPost)
  posts.push(args.inputPost);
  fs.writeFileSync(fileName,JSON.stringify(dataParse,null,4));
}

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      users: () => users,
      posts:() => posts,
    },
    Mutation:{
      createUser: createUser,
      createPost: createPost
    },
  };


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});