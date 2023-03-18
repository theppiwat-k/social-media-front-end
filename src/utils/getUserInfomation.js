import jwt_decode from "jwt-decode";

const getUserInfomation = ((token)=>{
    const decoded = jwt_decode(token);
    return decoded
}) 

export default getUserInfomation;


