const { GraphQLServer, PubSub } = require("graphql-yoga");
const { Prisma } = require("prisma-binding");
const logger = require("morgan");

const resolvers = require("./resolvers");

const { permissions } = require("./middlewares/auth.middleware");

require("dotenv").config();

const pubsub = new PubSub();
const prisma = new Prisma({
    typeDefs: "src/generated/prisma.graphql",
    endpoint: process.env.URL_DB_PRISMA,
});

const server = new GraphQLServer({
    typeDefs: "src/schema.graphql",
    resolvers,
    context: (req) => ({
        req,
        prisma,
        pubsub,
    }),
    middlewares: [permissions],
});

server.start(() =>
    console.log(`GraphQL server is running on http://localhost:4000`)
);

server.express.use(logger("dev"));
