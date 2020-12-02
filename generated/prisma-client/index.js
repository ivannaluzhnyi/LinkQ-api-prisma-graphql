"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Account",
    embedded: false
  },
  {
    name: "Address",
    embedded: false
  },
  {
    name: "Application",
    embedded: false
  },
  {
    name: "Contract",
    embedded: false
  },
  {
    name: "DoctrineMigrationVersion",
    embedded: false
  },
  {
    name: "Feature",
    embedded: false
  },
  {
    name: "Greeting",
    embedded: false
  },
  {
    name: "Guarantor",
    embedded: false
  },
  {
    name: "Media",
    embedded: false
  },
  {
    name: "Property",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
exports.prisma = new exports.Prisma();
