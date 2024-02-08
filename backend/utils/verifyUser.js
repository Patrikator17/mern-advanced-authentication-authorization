import jwt from "jsonwebtoken"
const JWT_SECRET_KEY = 'qwerty';


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token

    if(!token){
        return res.status(401).json({error: 'Access denied'})
    }
    jwt.verify(token, JWT_SECRET_KEY, (err, user) => {
        if(err){
            return res.status(403).json({message :'Token is not valid'})

        }
        req.user = user;
        next()
    })

}
//install cookie-parser