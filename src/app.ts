import express from 'express';
import { createSchema, createYoga } from 'graphql-yoga';
import {graphQLServer} from './schema'



export function buildApp(app: ReturnType<typeof express>) {

  app.use(graphQLServer.graphqlEndpoint, graphQLServer);

  return graphQLServer.graphqlEndpoint;
}