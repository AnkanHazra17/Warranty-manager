"use client";

import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { mockIssuesData, MockIssuesInfo } from "@/constants/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import CustomDataTable from "@/components/CustomDataTable";

function IssuesTable() {
  const issuesColumns: ColumnDef<MockIssuesInfo>[] = [
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email")}</div>,
    },
    {
      accessorKey: "deviceType",
      header: "Device Type",
      cell: ({ row }) => <div>{row.getValue("deviceType")}</div>,
    },
    {
      accessorKey: "deviceId",
      header: "Device Id",
      cell: ({ row }) => <div>{row.getValue("deviceId")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <div>{row.getValue("status")}</div>,
    },
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
              <DropdownMenuLabel>Update status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Resolved</DropdownMenuItem>

              <DropdownMenuItem>Pending</DropdownMenuItem>
              <DropdownMenuItem>Processing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(userData.deviceId)}
              >
                Copy device ID
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  return (
    <CustomDataTable
      columns={issuesColumns}
      data={mockIssuesData}
    ></CustomDataTable>
  );
}

export default IssuesTable;
