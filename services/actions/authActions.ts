import {apiConnector, RequestOptions} from "@/services/apiConnector";
import {authEndpoints} from "@/services/apis";

const {LOGIN_API, LOGOUT_API} = authEndpoints

export const loginUser = async (data: { password: string | undefined; username: string }) => {
    let result = null
    try {
        const options:RequestOptions = {
            method: "POST",
            data: data,
        }
        const response = await apiConnector(LOGIN_API, options);

        console.log("Login user Response: ", response);

        result = response.ok;
    }catch (error) {
        console.log(error);
    }
    return result;
}

export const logoutUser = async () => {
    let result = null
    try{
        const options:RequestOptions = {
            method: "POST",
        }
        const  response = await apiConnector(LOGOUT_API, options);

        result = response.ok;
    }catch (error) {
        console.log(error);
    }
    return result;
}