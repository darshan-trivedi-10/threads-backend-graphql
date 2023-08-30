import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function init() {
  const app = express();

  const PORT = Number(process.env.PORT) || 8000;

  app.use(express.json());

  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello : String
        }
        // type Mutation{
        //   createUser(firstName: String!, email:String!, password:String!)
        // }
    `, // Schema
    resolvers: {
        Query : {
            hello : () =>{
                return "Hello I'm Graphql Not REST :) "
            }
        },
        Mutation : {
          // createUser : 
        }
    }
  });

  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json("Namaste From Server");
  });

  app.use('/graphql', expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(`Server Started at PORT ${PORT}`);
  });
}

init();