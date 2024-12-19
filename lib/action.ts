import {cookies} from "next/headers";
import {registerEndpoints} from "@/services/apis";
import {SERVER_LOCATION} from "@/services/envConfig";

const {GET_CUSTOMERS_API} = registerEndpoints;

export const getCustomers = async () => {
    try {
        const cookieStore = await cookies();
        const appCookie = cookieStore.get("sessionID")
        const response = await fetch(SERVER_LOCATION + GET_CUSTOMERS_API,
            {
                headers: {Cookie: `${appCookie?.name}=${appCookie?.value}`},
                cache: "no-store"
            })

        if(response.ok){
            return await response.json();
        }else{
            console.log(`Error getting customers: status code ${response.status} | ${response.statusText}`);
        }
    }catch (error) {
        console.error(error)
    }
}