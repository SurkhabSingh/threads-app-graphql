import express from "express";
import createApolloServerGraphQlServer from "./graphql";
import { expressMiddleware } from "@apollo/server/express4";
import UserService from "./service/user";

async function init() {
  const app = express();
  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());
  app.use(
    "/graphql",
    expressMiddleware(await createApolloServerGraphQlServer(), {
      context: async ({ req }) => {
        //@ts-ignore
        const token = req.headers["token"];
        
        try {
          const user = UserService.decodeJWT(token as string);
          return { user};
        } catch (error) {
          return "error";
        }
      },
    })
  );

  app.listen(PORT, () => {
    console.log(`server running on ${PORT}`);
  });
}
init();
