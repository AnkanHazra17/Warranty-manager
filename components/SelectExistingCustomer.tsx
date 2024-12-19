import React from "react";
import SearchCustomers from "@/components/SearchCustomers";
import { Label } from "@/components/ui/label";

function SelectExistingCustomer({ step }: { step: number }) {
  return (
    <div className="space-y-3">
      <p className="font-bold mb-3">
        Select one customer from existing customers
      </p>
      <div className="space-y-1">
        <Label className="leading-normal">Select customer</Label>
        <SearchCustomers step={step}></SearchCustomers>
      </div>
    </div>
  );
}

export default SelectExistingCustomer;
