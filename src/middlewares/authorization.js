export const AuthorizationVerify = (req, res, next) => {
    if(req.headers.authorization !== process.env.AUTHORIZATION){
        return res.status(401).json({
            status: 401,
            message: 'Unauthorized'
        });
    }
    next()
}