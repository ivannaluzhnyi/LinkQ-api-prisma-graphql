const { GraphQLServer, PubSub } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");
const logger = require("morgan");

const resolvers = require("./resolvers");

require("dotenv").config();

const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers,
    context: (req) => ({
        req,
        prisma: new Prisma({
            typeDefs: "src/generated/prisma.graphql",
            endpoint: process.env.URL_DB_PRISMA,
        }),
        pubsub,
    }),
});

server.start(() =>
    console.log(`GraphQL server is running on http://localhost:4000`)
);

server.express.use(logger("dev"));
