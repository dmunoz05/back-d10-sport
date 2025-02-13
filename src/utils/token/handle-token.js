import jwt from 'jsonwebtoken'
import { variablesJWT } from '../params/const.jwt.js'

export async function generateToken(payload) {
    let secretOrPrivateKey = variablesJWT.jwt_secret
    return jwt.sign(payload, secretOrPrivateKey, { expiresIn: '15min', algorithm: variablesJWT.algorithm })
}

export async function generateTokenNoExpire(payload) {
    let secretOrPrivateKey = variablesJWT.jwt_secret
    return jwt.sign(payload, secretOrPrivateKey, { algorithm: variablesJWT.algorithm })
}

export async function verifyToken(token) {
    let secretOrPrivateKey = variablesJWT.jwt_secret
    return jwt.verify(token, secretOrPrivateKey)
}