const jwt = require("jsonwebtoken");

module.exports = Auth=(req,res,next)=>{
    const token = req.cookies.access_token;
    if (!token) {
        return res.sendStatus(403);
    }
    try {
        const data = jwt.verify(token, "NA_KEY");
        console.log(data);
        req.userId = data.id;
        req.userRole = data.role;
        return next();
    } catch {
        return res.sendStatus(403);
    }
}