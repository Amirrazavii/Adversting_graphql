import { PrismaClient ,Role, User } from '@prisma/client'
import { UserType,MutationMassage } from '../typeCrude/CrudeUserType'
import { GraphQLContext } from '../utiles/contextType'
import { compare, hash } from 'bcryptjs'
import {  sign } from 'jsonwebtoken'
import { YogaInitialContext } from 'graphql-yoga'
import {authenticateUser} from '../utiles/authenticateUser'
import { findeUserPublic } from '../utiles/findeUserPublic'
import { roleDecorator } from '../decorator/roleDecorator'
export class CruudeUserClass{
  private  prisma 
  constructor(){

      this.prisma = new PrismaClient()
  }

 @roleDecorator
   async findeUser(id:number,context :GraphQLContext,statusContext:boolean =false):Promise<UserType>{
    try {
      // const adminuser =context.currentUser;
      // if (adminuser == null || adminuser.roll !== Role.SETAD ){
  
      //  throw "datresi nadari"
      // } 
      
      if (statusContext ==false) {
        throw "error" 
      }
      const user =await this.prisma.user.findUnique({
        
        where: {
          id: id,
      
        },
    
      })
      
      if(user ==null){    
        throw "hamchin useri vojod nadarad"
          
      }
    
      
      return {
          password:user.password,
          id:user.id,
          name:user.name,
          profession:user.profession,
          imageurl:user.imageurl,
          description:user.description,
          roll:user.roll,
          isActive: user.isActive
      }
    } catch (error) {
      throw error
      
    }
    
  }

  @roleDecorator
  async diactiveUser(id:number,context :GraphQLContext,statusContext:boolean =false) : Promise<MutationMassage> { 
    try {
      const obj : MutationMassage={
        massage :"",
        status :false
      }
      // const adminuser =context.currentUser
      
      // if (adminuser == null || adminuser.roll !== Role.SETAD ){
  
      //   throw new Error("not permission")
      // } 
      if (statusContext ==false) {
        throw "error"
        
      }
  
  
      const user =await this.prisma.user.update({
          
        where: {
          id: id,
      
        },
        data:{
          isActive: false
        }
        
    
      });
  
  
      
      if(user !== null && user.isActive ==false){
   
        obj.massage ="success"
        obj.status =true
        return obj;
      }else{
        obj.massage ="fail"
        obj.status =false
        return obj;
      }
    }
    catch (error) {
      throw error
      
    }
   
  } 
  @roleDecorator
  async findeAllUser(skip:number,take:number,context :GraphQLContext,statusContext:boolean =false):Promise<UserType[]>{
    try {
      
      
      // const adminuser =context.currentUser
      // if (adminuser == null || adminuser.roll !== Role.SETAD){
  
      //     throw "dastresi nadari"
      // } 
      if (statusContext ==false) {
        throw "error"
        
      }
      
      const users =await this.prisma.user.findMany({
          skip: skip,
          take: take,
          orderBy: {
            name: 'desc',
          },
        });
  
        
        return users;
    } catch (error) {
      throw error
      
    }
  
  
  }
  @roleDecorator
   async updateUser(id:number,name:string,password:string ,profession:string ,imageurl:string,description:string,context :GraphQLContext,statusContext:boolean =false ):Promise<MutationMassage>{
  
    try {
      
      
      const obj : MutationMassage={
        massage :"",
        status :false
      }
      // const adminuser =context.currentUser
  
      
      
      // if (adminuser == null || adminuser.roll !== Role.SETAD ){
  
      //    obj.massage ="fail dastresi nadri"
      //    obj.status =false
      //    return obj
      // } 

      if (statusContext ==false) {
        throw "error"
        
      }
  
      const passwordHAsh = await hash(password, 10);
  
      const user = await this.prisma.user.update({
        where:{
          id:id
        },
        data: {
          name: name,
          password: passwordHAsh,
          profession:profession,
          description : description,
          roll : Role.ADMIN,
          imageurl :imageurl
          
        },
      })
      
      if (user !==null) {
        obj.massage ="success"
        obj.status =true
        return obj;
      }else{
        obj.massage ="fail"
        obj.status =false
        return obj;
      }
    } catch (err:any) {
      throw err
      
    }
  }
  
  async loginUser (id: number, password: string,context:GraphQLContext,statusContext:boolean =false){
  
    try {
      const privateKey=process.env.secret_key;
      if(privateKey ==undefined){
        throw ' '
      }
  
      const user = await findeUserPublic(id);
      
      
      const valid = await compare(password, user.password)
      if (!valid) {
        throw new Error('Invalid password')
      }
    
      
      const token = sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), userId: user.id }, privateKey )
   
      // 3
      return { token, user }
  
    } catch (error) {
      throw error
      
    }
  
  }
  @roleDecorator
   async createuser(name:string,password:string ,profession:string ,imageurl:string,description:string,context :GraphQLContext,statusContext:boolean =false):Promise<MutationMassage> {
  
    try {
      const obj : MutationMassage={
        massage :"",
        status :false
      }
      // const adminuser =context.currentUser
  
      // if (adminuser == null || adminuser.roll !== Role.SETAD ){
  
      //   throw new Error("not permission")
      // } 
      
      if (statusContext ==false) {
        throw "error"
        
      }
      //const currentUser = await authenticateUser(context.request);
      //console.log(context.currentUser);
  
        const passwordHAsh = await hash(password, 10);
        
        
      const user = await this.prisma.user.create({
        data: {
          password: passwordHAsh,
          name: name,
          profession: profession,
          description : description,
          roll : Role.ADMIN,
          imageurl :imageurl,
          
        },
      })    
  
  
      if (user.id) {
        obj.massage ="success"
        obj.status =true
        return obj
      }else{
        obj.massage ="fail"
        obj.status =false
        return obj;
      }
    } catch (err:any) {
      throw err
    }
  }
}
