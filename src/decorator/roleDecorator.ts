import { PrismaClient ,Role, User } from '@prisma/client'
import { UserType,MutationMassage } from '../typeCrude/CrudeUserType'
import { GraphQLContext } from '../utiles/contextType'

export const roleDecorator= (target: any, propertyKey: string,descriptor: PropertyDescriptor) => {

    const originalMethod = descriptor.value;
    descriptor.value = function(...args: any[]){
        const args2 =args[args.length - 2]
        const adminuser= args2.currentUser
        

        if (adminuser == null || adminuser.roll !== Role.SETAD ){
    
            args[args.length -1] = false
        }else{

          args[args.length -1] = true
        }
        
     const result = originalMethod.apply(this, args)
      return result;
    };  
      
      return descriptor;
    
    };



