import { PrismaClient ,Role, User } from '@prisma/client'
import { UserType } from '../typeCrude/CrudeUserType'




const prisma = new PrismaClient()

export const createuser=async(name:string ,profession:string ,imageurl:string,description:string ):Promise<string> => {

  try {
    

    const user = await prisma.user.create({
      data: {
        name: name,
        profession:profession,
        description : description,
        roll : Role.ADMIN,
        imageurl :imageurl
        
      },
    })
    
    if (user.id) {
      return "crete seccsee";
    }else{
      return "faild";
    }
  } catch (err:any) {
    throw err
    
  }
}
export const  findeUser=async(id:number):Promise<UserType> =>{
  try {
    const user =await prisma.user.findUnique({
      
      where: {
        id: id,
    
      },
  
    })
    
    if(user ==null){    
      throw 'hamchin useri nist'  
    }
    return {
        id:user.id,
        name:user.name,
        profession:user.profession,
        imageurl:user.imageurl,
        description:user.description
    }
  } catch (error) {
    throw error
    
  }
  
}

export const  diactiveUser=async(id:number) : Promise<string> =>{ 
  console.log(id);
  
if(typeof id==='number'){

  const user =await prisma.user.update({
      
    where: {
      id: id,
  
    },
    data:{
      isActive: false
    }
    

  });
  if(user !== null && user.isActive ==false){
   
    return "secssec"
  }else{
    return "hamchin ussri namana"
  }
}
else{
  return "value is number"
}

}

export const findeAllUser=async(skip:number,take:number):Promise<UserType[]>=>{
  console.log(skip);
  
  const users =await prisma.user.findMany({
      skip: skip,
      take: take,
      orderBy: {
        name: 'desc',
      },
    });
    return users;


}

export const updateUser=async(id:number,name:string ,profession:string ,imageurl:string,description:string ):Promise<string> => {

  try {
    

    const user = await prisma.user.update({
      where:{
        id:id
      },
      data: {
        name: name,
        profession:profession,
        description : description,
        roll : Role.ADMIN,
        imageurl :imageurl
        
      },
    })
    
    if (user !==null) {
      return "update shode"
    }else{
      return "uset not found"
    }
  } catch (err:any) {
    throw err
    
  }
}