import request from "supertest";
import app from '../index'
const {  gql } = require('graphql');

let token : string;

beforeAll(async () => {
 

    const mutation =`
        mutation{
        loginUser(email:"amir.rzma@gmail.com",password:"a"){
        user{
            id
        },
        token
      }
    }`;
    const response = await request(app)
    .post('/graphql')
    .send({query:mutation});
    token =response.body.data.loginUser.token;
  });



describe("crudeUser", () => {
    test("heloo", async() => {

            // await response.send()
            const query = `
            {
            hello
            }
        `;
        const response = await request(app)
        .post('/graphql')
        .send({ query });

        expect(response.status).toBe(200);
        expect(response.body).toMatchObject({
            data: {
            hello: 'Hello, World!',
            },
        });
    });
    test("findeUser",async()=>{
        const query = `
        query{
          findeUser(id:1){
            id,
            name
          }
        }
      `
      const response = await request(app)
      .post('/graphql')
      .send({ query })
      .set('Authorization', `Bearer ${token}`);
      expect(response.status).toBe(200);
      const {data} =response.body;
      expect(data.findeUser).not.toBeNull();

    });
    test("findeAllUser",async()=>{
        const query = `
        query{
            findeAllUser(skip:3,take:3){
            id,
            name
          }
        }
      `
      const response = await request(app)
      .post('/graphql')
      .send({ query })
      .set('Authorization', `Bearer ${token}`);
       expect(response.status).toBe(200);
       const {data} =response.body
       expect(data.findeAllUser).not.toBeNull();


    })
    test("createuser",async()=>{
        const mutation=`
        mutation{
            createUser(name:"asahdfgsdaasdsdfsfffadfgddddsq",password:"a",profession:"a",imageurl:"a",description:"a"){
            massage,
            status
        }
    }`
        const response = await request(app)
        .post('/graphql')
        .send({ query:mutation })
        .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200); 
        const {data} =response.body;
        expect(data.createUser).not.toBeNull();
        expect(data.createUser).toEqual({massage:"success",status:true})
        
    });
    test("updateuser",async()=>{
        const mutation=`
        mutation{
            updateUser(id:90,name:"afsdfsdfrsdfq",password:"aaa",profession:"aaa",imageurl:"a",description:"aa"){
            massage,
            status
        }
    }`
        const response = await request(app)
        .post('/graphql')
        .send({ query:mutation })
        .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        const {data} =response.body;
        expect(data.updateUser).not.toBeNull();
        expect(data.updateUser).toEqual({massage:"success",status:true})
        
    });
    test("diactiveuser",async()=>{
        const mutation=`
        mutation{
            diactiveUser(id:89){
            massage,
            status
        }
    }`
        const response = await request(app)
        .post('/graphql')
        .send({ query:mutation })
        .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
        const {data} =response.body;
        expect(data.diactiveUser).not.toBeNull();
        expect(data.diactiveUser).toEqual({massage:"success",status:true})
        
    })
  });