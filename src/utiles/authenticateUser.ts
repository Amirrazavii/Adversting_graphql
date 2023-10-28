import { JwtPayload, verify } from 'jsonwebtoken'
import { findeUserPublicById } from './findeUserPublic'
import { UserType } from '../typeCrude/CrudeUserType'


export const authenticateUser = async(
    request: Request
  ): Promise<UserType | null> =>{
    

    try {
        const privateKey=process.env.secret_key;
        if(privateKey == undefined){
            throw "seretkey vojod nadard"
        }
        // console.log(request.headers);
        
        const header = request.headers.get('authorization')  
        console.log(header);
        if(header ==null){
            return null
        }     
        
        const token = header.split(' ')[1]

        const tokenPayload = verify(token, privateKey) as JwtPayload
    
        

        
        const userId = tokenPayload.userId
            
         const user =await findeUserPublicById(userId);

         
       
          return user

        
    } catch (error) {

        throw error
        
    }
    
}

