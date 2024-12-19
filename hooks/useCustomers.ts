import {useEffect, useState} from "react";
import {CustomerDetails} from "@/constants/data";
import {getAllCustomers, GetCustomers} from "@/services/actions/customersActions";

function useCustomers(page: number) {
    const [allCustomers, setAllCustomers] = useState<CustomerDetails[]>([]);
    const [customerLoading, setCustomerLoading] = useState<boolean>(true);

    const getAllCustomersHandler = async () => {
        setCustomerLoading(true);
        try {
            const params: GetCustomers = {
                page: page,
            }
            const customers = await getAllCustomers(params);
            setAllCustomers(customers);
        }catch (error) {
            console.log(error)
        }finally {
            setCustomerLoading(false);
        }
    }

    useEffect(() => {
        getAllCustomersHandler()
    }, [page])

    return {allCustomers, customerLoading}
}

export default useCustomers;