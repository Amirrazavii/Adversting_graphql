

export type UserType ={
    id: number;
    name: string;
    imageurl: string;
    profession: string;
    description: string;
    roll:string;
    password:string
    isActive:boolean
}

export type AuthPayload ={
  token: string
  user: UserType | string
}

export type MutationMassage ={
  massage: string
  status: boolean
}