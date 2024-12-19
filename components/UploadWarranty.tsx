import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import WarrantyUploadForm from "@/components/WarrantyUploadForm";

function UploadWarranty() {
  return (
    <Tabs defaultValue="new">
      <TabsList className="mb-3">
        <TabsTrigger value="new">New customer</TabsTrigger>
        <TabsTrigger value="existing">Existing customer</TabsTrigger>
      </TabsList>
      <TabsContent value="new">
        <WarrantyUploadForm type="new"></WarrantyUploadForm>
      </TabsContent>
      <TabsContent value="existing">
        <WarrantyUploadForm type="existing"></WarrantyUploadForm>
      </TabsContent>
    </Tabs>
  );
}

export default UploadWarranty;
