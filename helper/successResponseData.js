import { HttpStatus } from "../constant/constant.js";

const successResponseData = ({res,data=null,message = "",statusCode = HttpStatus.OK }) => {
    res.status(statusCode).json({ success : true,
        ...(data && {data}), // ... means spreadoperator which open the wrapper of object
        ...(message && { message })
    })
}

export default successResponseData