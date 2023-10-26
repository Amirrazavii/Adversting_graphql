// import { createClient } from 'redis';
import {client,transporter} from '../index'
import { PrismaClient } from '@prisma/client'
import { MutationMassage,AuthPayload ,UserType} from '../typeCrude/CrudeUserType'
import {  sign } from 'jsonwebtoken'
import {findeUserPublic} from "../utiles/findeUserPublic"
// import nodemailer from 'nodemailer'

// const transporter = nodemailer.createTransport({
//   service: 'Gmail', // Use your email service provider (e.g., 'Gmail', 'Outlook', 'Yahoo')
//   auth: {
//     user: process.env.email, // Your email address
//     pass: process.env.pass // Your email password or an app-specific password
//   }
// });

// export let client:any;

// (async function craeteClientRedis() {
//    client = await createClient()
//     .on('error', err => console.log('Redis Client Error', err))
//     .connect();
  
// })();

const prisma = new PrismaClient()

 export const checkCode=async(email: string ,code:String):Promise<AuthPayload>=>{

  const obj : AuthPayload={
    token :"",
    user: "",
  }

    try {
      const privateKey=process.env.secret_key;
      
      if(privateKey ==undefined){
        throw ' '
      }


      const password = await client.GET(email)
      
      if( password !==code){
         
        throw "code incorrect"

      }

     const user = await findeUserPublic(email);
     if (user ==null && user ==undefined) {
      throw "user not found"
      
     }
     

      const token = sign({exp: Math.floor(Date.now() / 1000) + (60 * 60), userId: user.id }, privateKey );
      console.log(token);
      if (!token) {
        throw "error"
        
      };
      obj.user ==user
      obj.token ==token
      return obj
  
    } catch (error) {

      throw error
      
      
    }
  
  }
  export const findeUserEmail=async(email:string):Promise<MutationMassage> =>{
    const obj : MutationMassage={
      massage :"",
      status :false
    }
    try {
      const user =await prisma.user.findUnique({
        
        where: {
          email:email
      
        },
      })
      console.log(user);
      
      if (user ==null) {
        obj.massage ="fail"
        obj.status =false
        return obj
        
      }
      const value =await client.SET(email,Math.round(Math.random()*(10**6)));
      console.log(value);

      const mailOptions = {
        from: process.env.email, // Sender's email address
        to:email, // Recipient's email address
        subject: 'code login',
        text: value
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
    

        obj.massage ="success"
        obj.status =true
        return obj;
      
       
      
    } catch (error) {
      obj.massage ="fail"
      obj.status =false
      return obj
      
    }

  }
  //  findeUserEmail("amir.rzma@gmail.com")
  // //  checkCode("amir.rzma@gmail.com","191416")


  