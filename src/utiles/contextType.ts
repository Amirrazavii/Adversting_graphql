import { YogaInitialContext } from 'graphql-yoga'
import { PrismaClient } from '@prisma/client'
import { authenticateUser } from './authenticateUser'
import { UserType } from '../typeCrude/CrudeUserType'
 
const prisma = new PrismaClient()
 
export type GraphQLContext = YogaInitialContext & {
  currentUser: null | UserType
}
 
// export async function createContext(initialContext: YogaInitialContext): Promise<GraphQLContext> {
//   return {
//     prisma,
//     currentUser: await authenticateUser(prisma,initialContext.request)
//   }
// }