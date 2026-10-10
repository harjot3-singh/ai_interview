const jwt = require("jsonwebtoken")
const tokenBlackListModel = require("../models/blacklist.model")

async function authUser(req,res,next){
    const token = req.cookies.token
    // to get user details we use token
    if(!token){
        return res.status(401).json({
            message:"token not provided"
        })
    }

    const isTokenBlackListed = await tokenBlackListModel.findOne({token})

    if(isTokenBlackListed){
        return res.status(401).json({
            message:"token is invalid"
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = decoded
        // if req don't have user i am creating one
        //middle
        next()
    }
    catch(err){
        return res.status(401).json({
            message:"invalid token"
        })
    }
}

module.exports = { authUser }