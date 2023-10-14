import { createSchema, createYoga } from 'graphql-yoga';
import {createuser} from './resolver/createUser'
import { objectEnumNames } from '@prisma/client/runtime/library';

export const graphQLServer = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      scalar File
      type Query {
        hello: String
      }
      type Mutation {
        getFileName(file: File!): String
        createUser: createuser

      }
      type Subscription {
        countdown(from: Int!): Int!
      }
      type createuser {
        name: String
        img: String
      }

    `,
    resolvers: {
      Query: {
        hello: () => 'world',
        
      },
      Mutation: {
        getFileName: (root, { file }: { file: File }) => file.name,
        createUser:async()=>{
        return await createuser()
      }
      },
      Subscription: {
        countdown: {
          async *subscribe(_, { from }) {
            for (let i = from; i >= 0; i--) {
              await new Promise(resolve => setTimeout(resolve, 1000));
              yield { countdown: i };
            }
          },
        },
      },
    },
  }),
  logging: false,
});