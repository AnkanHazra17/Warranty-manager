import {useEffect, useState} from "react";
import {getProductTypes} from "@/services/actions/registerWarrantyActions";


function UseProductTypes() {
    const [productTypes, setProductTypes] = useState<string[] | null>(null);
    const [productTypesLoading, setProductTypesLoading] = useState(false);

    const getProductTypesHandler = async () => {
        setProductTypesLoading(true);
        try {
            const productTypes = await getProductTypes();
            if(productTypes){
                setProductTypes(productTypes);
            }
        }catch (error) {
            console.error(error);
        }finally {
            setProductTypesLoading(false);
        }
    }

    useEffect(() => {
        getProductTypesHandler()
    }, [])

    return {productTypes, productTypesLoading}
}

export default UseProductTypes;