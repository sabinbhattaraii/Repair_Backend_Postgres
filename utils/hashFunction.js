import bcrypt from 'bcrypt'

//hash password
export const hashPassword = async (password = "", salt = 10) => {
    try {
        let innerHashPassword = await bcrypt.hash(password, salt)
        return innerHashPassword
    } catch (error) {
        let err = new Error(error.message)
        err.status = 400;
        throw err
    }
}

//compare password
export const comparePassword = async (password = "", hashPassword) => {
    try {
        let isValidPassword = await bcrypt.compare(password, hashPassword)
        // compare check whether a hashpassword is made from password
        // if yes return true else false
        return isValidPassword
    } catch (error) {
        let err = new Error("Please Enter a valid Email or Password")
        err.status = 401;
        throw err;
    }
}