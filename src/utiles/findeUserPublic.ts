import { PrismaClient ,Role} from '@prisma/client'
import { UserType } from '../typeCrude/CrudeUserType';

const prisma =new PrismaClient();
export const  findeUserPublic=async(id:number):Promise<UserType> =>{
    try {
      const user =await prisma.user.findUnique({
        
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
          isActive:user.isActive
      }
    } catch (error) {
      throw error
      
    }
    
  }