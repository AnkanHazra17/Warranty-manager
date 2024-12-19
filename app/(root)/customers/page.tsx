import React from "react";
import DataSection from "@/components/DataSection";
import Customers from "@/components/Customers";

function UsersInfoPage() {
  return (
    <DataSection>
      <div className="mt-10 space-y-8 mb-14">
        <p className="h3">Customers information</p>
        <Customers></Customers>
      </div>
    </DataSection>
  );
}

export default UsersInfoPage;
