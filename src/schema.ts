import { createSchema, createYoga } from 'graphql-yoga';
import {createuser,diactiveUser,findeAllUser,findeUser, updateUser} from './resolver/CrudUser'
import { objectEnumNames } from '@prisma/client/runtime/library';

export const graphQLServer = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      scalar File
      type Query {
        hello: String
        findeUser(id: Int): User
        diactiveUser(id: Int): String
        findeAllUser(skip:Int ,take:Int):[User]
      }
      type Mutation {
        getFileName(file: File!): String
        createUser( name: String ,profession: String,imageurl:String,description:String): String
        updateUser(id:Int, name: String ,profession: String,imageurl:String,description:String): String

      }
      type Subscription {
        countdown(from: Int!): Int!
      }
      type User {
        id: Int
        name: String
        profession: String!
        imageurl: String
        description: String
      }

    `,
    resolvers: {
      Query: {
        hello: () => 'world',
        findeUser:async(root,args :{id:number})=>{
          return await findeUser(args.id);
        },
        diactiveUser:async(root,args :{id:number})=>{
          return await diactiveUser(args.id)
        },
        findeAllUser:async(root,args :{skip:number;take:number})=>{
          return await findeAllUser(args.skip,args.take)
        }
        
      },
      Mutation: {
        getFileName: (root, { file }: { file: File }) => file.name,
        createUser:async(root :unknown, args :{name: string; imageurl: string ;description: string;profession:string})=>{
        return await createuser(args.name,args.profession,args.description,args.imageurl);
      },
      updateUser:async(root :unknown, args :{id:number;name: string; imageurl: string ;description: string;profession:string})=>{
        return await updateUser(args.id,args.name,args.profession,args.description,args.imageurl);
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