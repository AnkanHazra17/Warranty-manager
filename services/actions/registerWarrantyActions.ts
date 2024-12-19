import {registerEndpoints} from "@/services/apis";
import {apiConnector, RequestOptions} from "@/services/apiConnector";

const {REGISTER_CUSTOMER_API, GET_PRODUCT_TYPES_API, GET_SKU_API, REGISTER_WARRANTY_API} = registerEndpoints;

export interface UserDetails {
    email: string;
    name: string;
    phone: string;
    address: string;
}

export interface SKUName{
    name: string;
}

export interface RegisterWarranty{
    customer_id: number;
    sku: string;
    mac_ids: string[];
    purchase_date: string;
    warranty_start: string;
    warranty_end: string;
}

export interface UserDetailsResponse{
    address: string;
    country: string;
    customer_id: number;
    email: string;
    name: string;
    phone: string;
}

export const registerUserDetails = async (userDetails: UserDetails) => {
    let result: UserDetailsResponse | null = null
    try {
        const options: RequestOptions = {
            method: "POST",
            data: userDetails,
        }
        const response = await apiConnector(REGISTER_CUSTOMER_API, options);

        if(response.ok){
            result = await response.json()
        }
    } catch (error){
        console.log(error);
    }
    return result
}

export const getProductTypes = async () => {
    let result: string[] | null = null
    try {
        const options: RequestOptions = {
            method: "GET",
        }
        const response = await apiConnector(GET_PRODUCT_TYPES_API, options);

        if(response.ok){
            result = await response.json();
        }
    }catch (error){
        console.log(error);
    }
    return result
}

export const getSKUs = async (produceType: SKUName) => {
    let result: string[] | null = null;
    try {
        const options: RequestOptions = {
            method: "POST",
            data: produceType
        }

        const response = await apiConnector(GET_SKU_API, options);

        if(response.ok){
            result = await response.json();
        }
    }catch (error){
        console.log(error);
    }
    return result;
}

export const registerWarranty = async (warrantyData: RegisterWarranty) => {
    try {
        const options: RequestOptions = {
            method: "POST",
            data: warrantyData,
        }
        const response = await apiConnector(REGISTER_WARRANTY_API, options)

        return response.ok;
    }catch (error){
        console.log(error);
    }
}

