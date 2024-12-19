import React from 'react';
import {SearchCustomer, searchCustomers} from "@/services/actions/customersActions";
import {CustomerDetails} from "@/constants/data";

function useSearchCustomers(searchKey: string) {
    const [searchLoading, setSearchLoading] = React.useState(false);
    const [customers, setCustomers] = React.useState<CustomerDetails[] | null>(null);

    const searchCustomerHandler = async () => {
        setSearchLoading(true);
        try {
            const params: SearchCustomer = {
                query: searchKey,
            }
            const data = await searchCustomers(params);
            if(data){
                setCustomers(Array.from(data));
            }
        }catch (error) {
            console.log(error)
        }finally {
            setSearchLoading(false);
        }
    }

    React.useEffect(() => {
        searchCustomerHandler();
    }, [searchKey])

    return {customers, searchLoading};
}

export default useSearchCustomers;