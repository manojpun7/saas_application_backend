import { NextFunction, Request, Response } from "express"


const asyncErrorHandler = (fn:Function)=>{
    return (req:Request,res:Response,next:NextFunction)=>{
        fn(req,res,next).catch((err:Error)=>{
            console.log(err, "ERROR")
            return res.status(500).json({
                message : err.message, 
                fullError : err
            })
        })
    }
}

// arrow function ---- 
/* 

higher order function --> testo function jasle parameter ma arko function accept garxa 
call back function ---> tyo function jun as a paramter/argument arko function ma gayiraxa 
teslai callback fn vaninxa 
e.g filter, map , reduce, forEach 
arrays.forEach(function(){
})

*/


export default asyncErrorHandler