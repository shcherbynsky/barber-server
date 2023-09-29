const jwt = require('jsonwebtoken')
const { User } = require("../models/models");

module.exports = async function (req, res, next) {
    if (req.method === "OPTIONS") {
        next()
    }
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            return res.status(401).json({message: "Користувач не авторізован!"})
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        // const user = await User.findOne({where: {id: decoded.id}})
        // req.user = user
        
        req.user = decoded
        // req.user = decoded
        next()
    } catch (e) {
        res.status(401).json({message: "Користувач не авторізован!"})
    }
}