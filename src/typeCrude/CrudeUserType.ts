

export type UserType ={
    id: number;
    name: string;
    imageurl: string;
    profession: string;
    description: string;
    roll:string;
    password:string

}

export type AuthPayload ={
  token: string
  user: UserType
}

export type MutationMassage ={
  massage: string
  status: boolean
}