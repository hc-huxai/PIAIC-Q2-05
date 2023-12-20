"use client";
import { Eye, FileEditIcon, MoreHorizontal, Trash } from "lucide-react";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { TableCell, TableRow } from "./ui/table";
import { ContactData } from "@/types/contactData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useContactForm from "@/hooks/use-contact";
import { AlertModal } from "./modals/delete-modal";
import { QuickViewModal } from "./modals/quick-view-modal";

export const FormTableRow = ({ item }: { item: ContactData }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [peekOpen, setPeekOpen] = useState(false);
  const store = useContactForm();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  const onDelete = () => {
    try {
      setLoading(true);
      store.removeItem(item.id!);
    } catch (err) {
      console.error(err);
    } finally {
      setAlertOpen(false);
      setLoading(false);
    }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{item.email}</TableCell>
      <TableCell>{item.subject}</TableCell>
      <TableCell>
        <AlertModal
          isOpen={alertOpen}
          onClose={() => setAlertOpen(false)}
          onConfirm={onDelete}
          loading={loading}
        />
        <QuickViewModal 
        isOpen={peekOpen}
        onClose={() => setPeekOpen(false)}
        item={item}
        loading={loading}
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="mr-0 ml-auto" size={"icon"} variant={"ghost"}>
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-gray-600 text-xs">
              Actions
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex gap-2 items-center" onClick={() => setPeekOpen(true)}>
              <Eye className="w-4 h-4" /> View
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 items-center"
              onClick={() => router.push(`/${item.id!}`)}
            >
              <FileEditIcon className="w-4 h-4" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className="flex gap-2 items-center"
              onClick={() => setAlertOpen(true)}
            >
              <Trash className="w-4 h-4" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};
