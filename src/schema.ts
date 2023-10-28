import { createSchema, createYoga ,YogaInitialContext} from 'graphql-yoga';
import {CruudeUserClass} from './resolver/CrudUser'
import {findeUserEmail,checkCode}from './resolver/loginEmail'
//import {createuser,diactiveUser,findeAllUser,findeUser, updateUser,loginUser} from './resolver/CrudUser'
import { objectEnumNames } from '@prisma/client/runtime/library';
import { GraphQLContext} from './utiles/contextType'; 
import { authenticateUser } from './utiles/authenticateUser';

const crudeUser =new CruudeUserClass();


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
        loginUser(email: String, password: String!): AuthPayload
        loginEmail(email: String): MutationMassage
        checkCode(email: String ,code:String): AuthPayload
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
          
          return await crudeUser.findeUser(args.id,ctx,false);
        },
        findeAllUser:async(root,args :{skip:number;take:number},ctx :GraphQLContext)=>{
          return await crudeUser.findeAllUser(args.skip,args.take,ctx,false)
        },

        
      },
      Mutation: {
        getFileName: (root, { file }: { file: File }) => file.name,
        diactiveUser:async(root,args :{id:number},ctx :GraphQLContext)=>{
          return await crudeUser.diactiveUser(args.id,ctx,false)
        },
        createUser:async(root :unknown, args :{name: string;password:string ; imageurl: string ;description: string;profession:string ;},ctx :GraphQLContext)=>{
        return await crudeUser.createuser(args.name,args.password, args.profession,args.description,args.imageurl,ctx,false);
      },
      updateUser:async(root :unknown, args :{id:number;name: string;password:string; imageurl: string ;description: string;profession:string},ctx :GraphQLContext)=>{
        return await crudeUser.updateUser(args.id,args.name,args.password,args.profession,args.imageurl,args.description,ctx,false);
      },
      loginUser:async(root:unknown, args: { email: string; password: string },ctx :GraphQLContext)=>{
        return await crudeUser.loginUser(args.email,args.password,ctx)
      },
      loginEmail:async(root:unknown,args: {email: string},ctx :GraphQLContext)=>{
        return await findeUserEmail(args.email)
      },
      checkCode:async(root:unknown,args: {email: string ,code:String})=>{
        return await checkCode(args.email,args.code)
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