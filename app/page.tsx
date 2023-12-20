"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import useContactForm from "@/hooks/use-contact";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Eye, FileEditIcon, MoreHorizontal, Trash } from "lucide-react";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const data = useContactForm();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

  return (
    <>
      {/* <Button onClick={() => data.removeAll()}>Clear All</Button>
  {
    data.items.map((item, index) => (
      <p key={index}>{JSON.stringify(item)}</p>
    ))
  } */}
      <div className="space-y-4 p-8">
        {/* Content Header */}
        <div className="flex items-center justify-between">
          <Heading
            title="Contact Forms"
            description="Customers are alway right! 😉"
          />
        </div>
        <Separator />

        <div className="space-y-8 w-full">
          <Table>
            <TableCaption>A list of Contact Form Submissions.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Action</TableHead>
                {/* <TableHead className="text-right">Amount</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.email}</TableCell>
                  <TableCell>{item.subject}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          className="mr-0 ml-auto"
                          size={"icon"}
                          variant={"ghost"}
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel className='text-gray-600 text-xs'>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex gap-2 items-center"><Eye className="w-4 h-4"/> View</DropdownMenuItem>
                        <DropdownMenuItem className="flex gap-2 items-center"><FileEditIcon className="w-4 h-4"/> Edit</DropdownMenuItem>
                        <DropdownMenuItem className="flex gap-2 items-center"><Trash className="w-4 h-4"/> Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
