import { ApolloServer } from "@apollo/server";
import { User } from "./users/index";

async function createApolloServerGraphQlServer() {
  const server = new ApolloServer({
    typeDefs: `
    type Query {
          hello:String
  }
    type Mutation {
     ${User.mutations}
    }
    
    `,
    resolvers: {
      Query: { ...User.resolvers.queries },
      Mutation: { ...User.resolvers.mutations },
    },
  });

  await server.start();
  return server;
}

export default createApolloServerGraphQlServer;
