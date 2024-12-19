import React from 'react';
import DataSection from "@/components/DataSection";
import IssuesTable from "@/components/IssuesTable";

function IssuesPage() {
    return (
        <DataSection>
            <div className="mt-10 space-y-8 mb-14">
                <p className="h3">All issues uploaded by users</p>
                <IssuesTable></IssuesTable>
            </div>
        </DataSection>
    );
}

export default IssuesPage;