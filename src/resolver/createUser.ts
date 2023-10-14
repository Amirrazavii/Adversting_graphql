import { PrismaClient ,Role } from '@prisma/client'




const prisma = new PrismaClient()

export async function createuser() {
  const user = await prisma.user.create({
    data: {
      name: 'Alice',
      profession:'hesabder',
      description : "kj",
      roll : Role.ADMIN,
      imageurl :"a"
      
    },
  })

  return {
    name : user.name,
    img :user.imageurl
  }

}