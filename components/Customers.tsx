"use client"
import React, {useState} from 'react';
import UsersTable from "@/components/UsersTable";
import useCustomers from "@/hooks/useCustomers";
import {useDebounce} from "@/hooks/useDebounce";
import useSearchCustomers from "@/hooks/useSearchCustomers";
import SearchBar from "@/components/SearchBar";

function Customers() {
    const [page, setPage] = React.useState(1);
    const {allCustomers, customerLoading} = useCustomers(page)
    const [search, setSearch] = useState("");
    const debouncedValue = useDebounce(search, 500);
    const {customers, searchLoading} = useSearchCustomers(debouncedValue);
    return (
        <div className="space-y-6 mx-1">
            <div className="max-w-[450px]">
                <SearchBar search={search} setSearch={setSearch}/>
            </div>
            {
                search !== "" ? (
                    <>
                        {
                            customers && (
                                <UsersTable customers={customers} page={page} setPage={setPage} isLoading={searchLoading}></UsersTable>
                            )
                        }
                    </>
                ) : (
                    <>
                        <UsersTable customers={allCustomers} page={page} setPage={setPage} isLoading={customerLoading}></UsersTable>
                    </>
                )
            }
        </div>
    );
}

export default Customers;