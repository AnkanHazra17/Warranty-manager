import {useEffect, useState} from "react";
import {getSKUs, SKUName} from "@/services/actions/registerWarrantyActions";

function UseSkUs(productType: string | null) {
    const [skuLoading, setSkuLoading] = useState<boolean>(false);
    const [skus, setSku] = useState<string[] | null>(null);

    const getSKUsHandler = async () => {
        setSkuLoading(true);
        try {
            if(!productType){
                return
            }
            const params: SKUName = {
                name: productType
            }
            const allSkus = await getSKUs(params)

            if(allSkus){
                setSku(allSkus);
            }
        }catch (error) {
            console.error(error)
        }finally {
            setSkuLoading(false);
        }
    }

    useEffect(() => {
        getSKUsHandler()
    }, [productType])

    return {skuLoading, skus}
}

export default UseSkUs;