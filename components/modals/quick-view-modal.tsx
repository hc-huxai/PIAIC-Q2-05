"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
import { ContactData } from "@/types/contactData";

interface QuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  loading: boolean;
  item: ContactData
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  isOpen,
  onClose,
  loading,
  item
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={`Form by ${item.email}`}
      description={`<${item.id}>`}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex flex-col text-sm w-full">
        <div className="flex items-center gap-2 ">
          <h4 className="font-bold">First Name:</h4>
          <p>{item.firstName}</p>
        </div>
      </div>
    </Modal>
  );
};
