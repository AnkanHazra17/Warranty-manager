import React, {Suspense} from 'react';
import DataSection from "@/components/DataSection";
import UploadWarranty from "@/components/UploadWarranty";
import WarrantyFormLoader from "@/components/loaders/WarrantyFormLoader";

async function UploadPage() {
    return (
        <DataSection>
            <div className="mt-10 space-y-8">
                <p className="h3">Register device for warranty</p>
                <Suspense fallback={<WarrantyFormLoader/>}>
                    <UploadWarranty></UploadWarranty>
                </Suspense>
            </div>
        </DataSection>
    );
}

export default UploadPage;