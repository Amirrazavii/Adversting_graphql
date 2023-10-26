import express from 'express';
import {graphQLServer} from './schema'



export function buildApp(app: ReturnType<typeof express>) {


  app.use(graphQLServer.graphqlEndpoint, graphQLServer);



  return graphQLServer.graphqlEndpoint;
}