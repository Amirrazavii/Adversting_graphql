import { JwtPayload, verify } from 'jsonwebtoken'
import { findeUserPublic } from './findeUserPublic'
import { UserType } from '../typeCrude/CrudeUserType'


export const authenticateUser = async(
    request: Request
  ): Promise<UserType | null> =>{
    

    try {

        const header = request.headers.get('authorization')  
        const privateKey=process.env.secret_key;
        if(privateKey == undefined){
            throw "seretkey vojod nadard"
        }
        if(header ==null){
            return null
        }
        const token = header.split(' ')[1]

        
        
        const tokenPayload = verify(token, privateKey) as JwtPayload

        
        const userId = tokenPayload.userId
            
         const user =await findeUserPublic(userId);
       
          return user

        
    } catch (error) {

        throw error
        
    }
    
}

