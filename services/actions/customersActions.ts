import {registerEndpoints} from "@/services/apis";
import {apiConnector, RequestOptions} from "@/services/apiConnector";
import {CustomerDetails} from "@/constants/data";

const {SEARCH_CUSTOMER_API, GET_CUSTOMERS_API} = registerEndpoints;

export interface SearchCustomer {
    query: string;
}

export interface GetCustomers{
    page: number;
}

export const searchCustomers = async (query: SearchCustomer) => {
    let result: CustomerDetails[] = []
    try {
        const options: RequestOptions = {
            method: "POST",
            data: query,
        }
        const response = await apiConnector(SEARCH_CUSTOMER_API, options)
        if (response.ok){
            const searchResult = await response.json();
            result = searchResult.customers;
        }
    }catch (error){
        console.log(error);
    }
    return result;
}

export const getAllCustomers = async (page: GetCustomers) => {
    let result: CustomerDetails[] = []
    try {
        if(page.page !== 0){
            const options: RequestOptions = {
                method: "POST",
                data: page,
            }
            const response = await apiConnector(GET_CUSTOMERS_API, options);
            if(response.ok){
                const data = await response.json();
                result = data.customers
            }
        }
    }catch (error){
        console.log(error);
    }
    return result
}