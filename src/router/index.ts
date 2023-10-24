import express from 'express';
import { Request ,Response } from 'express';
import multer from 'multer'
const fs = require("fs");
// import {authenticateUser} from '../utiles/authenticateUser'
const crypto = require("crypto")
const router = express.Router();

// Define your routes and middleware here

// router.get("/avatar",(req,res)=>{
//     const photo = uploadPhoto(req);
// })



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/user/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix )
    }
  })
  const upload = multer({ storage: storage })

router.post("/user", upload.single("file"), (req:Request, res:Response)=> {

    try {

       if (req.file !==undefined) {

       res.json({path:req.file.path})

        
       }else{
        
        res.status(400).json({ error: "File not provided" });
       }
          
        
    } catch (error) {

      
      res.status(500).json({ error: "Internal server error" });
    }

    }

  
  );

  export default router;