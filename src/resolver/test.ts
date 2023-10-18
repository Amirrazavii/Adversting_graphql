import { log } from '../decorator/testdecorator'


class tt{


@log
     async a(j:number,k:number){

        try {
            console.log(k);
            
        } catch (error) {
            throw error
            
        }

        


    }
}

const a =new tt()
a.a(7,4)