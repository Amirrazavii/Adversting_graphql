import { createSchema, createYoga ,YogaInitialContext} from 'graphql-yoga';
import {createuser,diactiveUser,findeAllUser,findeUser, updateUser,loginUser} from './resolver/CrudUser'
import { objectEnumNames } from '@prisma/client/runtime/library';
import { GraphQLContext} from './utiles/contextType'; 
import { authenticateUser } from './utiles/authenticateUser';

export const graphQLServer = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      scalar File
      type Query {
        hello: String
        findeUser(id: Int): User
        findeAllUser(skip:Int ,take:Int):[User]

      }
      type Mutation {
        getFileName(file: File!): String
        createUser(name: String ,password:String,profession: String,imageurl:String,description:String): MutationMassage
        updateUser(id:Int, name: String,password: String,profession: String,imageurl:String,description:String): MutationMassage
        diactiveUser(id: Int): MutationMassage
        loginUser(id: Int, password: String!): AuthPayload
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
        roll: String
        password:String
        isActive:Boolean
      }
      type AuthPayload {
       token: String
       user: User
       }
       type MutationMassage{
        massage: String
        status: Boolean
       }


    `,
    resolvers: {
      Query: {
        hello: (_, __, context) => {
          // Access the user data from the context
          //console.log(context.currentUser);
          return 'Hello, World!';
        },
        findeUser:async(root,args :{id:number},ctx :GraphQLContext)=>{
          
          return await findeUser(args.id,ctx);
        },
        findeAllUser:async(root,args :{skip:number;take:number},ctx :GraphQLContext)=>{
          return await findeAllUser(args.skip,args.take,ctx)
        },

        
      },
      Mutation: {
        getFileName: (root, { file }: { file: File }) => file.name,
        diactiveUser:async(root,args :{id:number},ctx :GraphQLContext)=>{
          return await diactiveUser(args.id,ctx)
        },
        createUser:async(root :unknown, args :{idSetad:number ;name: string;password:string ; imageurl: string ;description: string;profession:string ;},ctx :GraphQLContext)=>{
        return await createuser(args.name,args.password, args.profession,args.description,args.imageurl,ctx);
      },
      updateUser:async(root :unknown, args :{id:number;name: string;password:string; imageurl: string ;description: string;profession:string},ctx :GraphQLContext)=>{
        return await updateUser(args.id,args.name,args.password,args.profession,args.description,args.imageurl,ctx);
      },
      loginUser:async(root:unknown, args: { id: number; password: string },ctx :GraphQLContext)=>{
        return await loginUser(args.id,args.password,ctx)
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
  context:async ({ request } )=> {
    return { currentUser : await authenticateUser(request) ?? null}
  },
  logging: false,
});