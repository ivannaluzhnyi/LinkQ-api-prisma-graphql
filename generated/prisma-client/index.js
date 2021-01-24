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
    name: "Application",
    embedded: false
  },
  {
    name: "Contract",
    embedded: false
  },
  {
    name: "Event",
    embedded: false
  },
  {
    name: "EventStatus",
    embedded: false
  },
  {
    name: "ApplicationStatus",
    embedded: false
  },
  {
    name: "Commentaire",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `http://prisma:4467`
});
exports.prisma = new exports.Prisma();
