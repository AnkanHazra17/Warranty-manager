import React from 'react';
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";

function SearchBar({ search, setSearch }: { search: string, setSearch: (search: string) => void }) {
    return (
        <div className="block relative">
            <Input
                placeholder="Serach customers..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onLoad={() => setSearch("")}
            ></Input>
            <Search className="absolute top-2 left-2 text-gray-600" size={20}></Search>
        </div>
    );
}

export default SearchBar;