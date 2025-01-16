import express from "express";
import createApolloServerGraphQlServer from "./graphql";
import { expressMiddleware } from "@apollo/server/express4";


async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());
  app.use(
    "/graphql",
    expressMiddleware(await createApolloServerGraphQlServer())
  );

  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
}
init();
