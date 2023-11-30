import jwt from 'jsonwebtoken'

export const generateToken = async (
    infoObj = {},
    secretkey = "",
    expiresIn = "365"
) => {
    //send expiresInfo like

    let expiresInfo = {
        expiresIn: expiresIn,
    }

    //generate token 
    //at infoObj we mostly use _id property

    try {
        let token = await jwt.sign(infoObj, secretkey, expiresInfo)
        return token;
    } catch (error) {
        let err = new Error(error.message);
        error.statusCode = "400";
        throw err
    }
}


//verify token
export const verifyToken = async (token = "", secretkey = "") => {
    try {
        let infoObj = await jwt.verify(token, secretkey);
        return infoObj
    } catch (error) {
        let err = new Error(error.message);
        error.statusCode = "401"
        throw err
    }
}