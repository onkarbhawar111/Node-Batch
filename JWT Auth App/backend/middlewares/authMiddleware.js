import jwt from 'jsonwebtoken'

const authMiddleware = (req, res, next) =>{
    const authHeader = req.headers.authorization;
     const token = authHeader && authHeader.split(" ")[1];
     if(!token){
        return res.staus(400).json({msg:"Token missing"})
     }

     jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            return res.staus(400).json({msg:"Token invalid"})
        }
        req.user = user
     })
     next();
}

export default authMiddleware