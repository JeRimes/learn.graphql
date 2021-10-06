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

  type Mutation{
    createUser(input: UserInput!):User
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
  //To do 
  const fs = require('fs');
  const fileName="bdd.json"
  const data = fs.readFileSync(fileName);
  var dataParse = JSON.parse(data);
  dataParse.input.email="cou";
  fs.writeFileSync(fileName,JSON.stringify(dataParse,null,4));
}
// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
    Query: {
      users: () => users,
      posts:()=> posts,
    },
    Mutation:{
      createUser: createUser
    },
  };


// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});