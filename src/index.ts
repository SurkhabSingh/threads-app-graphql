import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  // app.get("/", (req, res) => {
  //   res.json({ message: "server is running" });
  // });

  const server = new ApolloServer({
    typeDefs: `
    type Query {
          hello: String
          name(name:String): String
    }
    `,
    resolvers: {
      Query: {
        hello: () => "hey graphql here",
        name: (_, { name }: { name: String }) => `Hey ${name}`,
      },
    },
  });

  await server.start();
  app.use(express.json());
  app.use("/graphql", expressMiddleware(server));

  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
}
init();
