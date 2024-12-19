"use client"

import React, {useState} from 'react';
import SearchBar from "@/components/SearchBar";
import useSearchCustomers from "@/hooks/useSearchCustomers";
import {useDebounce} from "@/hooks/useDebounce";
import CustomerSearchResult from "@/components/CustomerSearchResult";

function SearchCustomers({step}: {step: number}) {
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounce(search, 500);
    const {customers, searchLoading} = useSearchCustomers(debouncedValue);

    return (
        <div className="space-y-3">
            <SearchBar search={search} setSearch={setSearch}></SearchBar>
            {
                customers && (
                    <CustomerSearchResult
                        customers={customers}
                        searchValue={debouncedValue}
                        isLoading={searchLoading}
                        step={step}
                    />
                )
            }
        </div>
    );
}

export default SearchCustomers;