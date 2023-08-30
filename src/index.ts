import express from "express";
import createApolloGraphqlServer from "./graphql";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();

  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  app.get("/", (req, res) => {
    res.json("Namaste From Server");
  });

  const gqlServer = await createApolloGraphqlServer();
  app.use('/graphql', expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
  });
}

init();