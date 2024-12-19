"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CustomerDetails } from "@/constants/data";
import CustomDataTable from "@/components/CustomDataTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Loader, MoreHorizontal } from "lucide-react";

interface UserTableProps {
  customers: CustomerDetails[];
  page: number;
  setPage: (page: number) => void;
  isLoading?: boolean;
}

function UsersTable({ customers, isLoading, page, setPage }: UserTableProps) {
  const userColumn: ColumnDef<CustomerDetails>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div>{row.getValue("name")}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "phone",
      header: "Mobile No",
      cell: ({ row }) => <div>{row.getValue("phone")}</div>,
    },
    // {
    //     accessorKey: "total",
    //     header: "Total Devices",
    //     cell: ({row}) => (
    //         <div>{row.getValue("total")}</div>
    //     )
    // },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const userData = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(userData.email)}
              >
                Copy email ID
              </DropdownMenuItem>

              <DropdownMenuItem>View user details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const handleNext = () => {
    setPage(page + 1);
  };
  const handlePrev = () => {
    setPage(page - 1);
  };
  console.log("Customers: ", customers);
  return (
    <div>
      <div className="rounded-xl border p-4">
        {isLoading ? (
          <div className="flex justify-center">
            <Loader className="animate-spin"></Loader>
          </div>
        ) : (
          <CustomDataTable
            columns={userColumn}
            data={customers}
          ></CustomDataTable>
        )}
      </div>
      <div className="flex gap-5 justify-end pt-4">
        <Button variant="outline" disabled={page <= 1} onClick={handlePrev}>
          Previous
        </Button>
        <Button
          variant="outline"
          disabled={customers.length < 10}
          onClick={handleNext}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default UsersTable;
