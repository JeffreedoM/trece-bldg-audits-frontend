// import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
export const columns = [
  {
    accessorKey: "_id",
    header: "School",
  },
  {
    accessorKey: "count",
    header: "No. of Buildings",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const school = row.original;

      //   return (
      //     <DropdownMenu>
      //       <DropdownMenuTrigger asChild>
      //         <Button variant="ghost" className="h-8 w-8 p-0">
      //           <span className="sr-only">Open menu</span>
      //           <MoreHorizontal className="h-4 w-4" />
      //         </Button>
      //       </DropdownMenuTrigger>
      //       <DropdownMenuContent align="end">
      //         <DropdownMenuLabel>Actions</DropdownMenuLabel>
      //         {/* <DropdownMenuItem
      //           onClick={() => navigator.clipboard.writeText(payment.id)}
      //         >
      //           Copy payment ID
      //         </DropdownMenuItem>
      //         <DropdownMenuSeparator />
      //         <DropdownMenuItem>View customer</DropdownMenuItem>
      //         <DropdownMenuItem>View payment details</DropdownMenuItem> */}
      //       </DropdownMenuContent>
      //     </DropdownMenu>
      //   );

      return (
        <div className="flex gap-1">
          {/* <Button>Edit</Button> */}
          <Link to={`${school._id}`}>
            <Button>View</Button>
          </Link>
        </div>
      );
    },
  },
];
