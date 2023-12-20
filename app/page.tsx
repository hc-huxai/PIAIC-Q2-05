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
import { useRouter } from "next/navigation";
import { FormTableRow } from "@/components/table-row";

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const store = useContactForm();
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
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
              {store.items.map((item, index) => {
                return <FormTableRow key={index} item={item} />;
              })}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}
