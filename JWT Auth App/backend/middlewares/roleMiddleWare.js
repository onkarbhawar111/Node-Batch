const checkRole = (roles) =>{
    return (req, res, next) =>{
        if(!roles.includes(req.user.role)){
            return res.status(403).json({error:"Access Denied: Insufficient Permissions "})
        }
        next();
    }
}
export default checkRole