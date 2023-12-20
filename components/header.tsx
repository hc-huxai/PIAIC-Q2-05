"use client"
import Image from "next/image";
import logo from "@/assets/img/logo.png";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FilePlus2, MessageSquareQuote } from "lucide-react";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();

  console.log(pathname)

  return (
    <header className="w-screen h-16 p-4 px-8 flex items-center justify-between select-none border-b">
      <Link href="/">
        <Image
          src={logo}
          alt="logo"
          className="h-8 w-auto select-none cursor-pointer"
        />
      </Link>

      {pathname == "/" ? (
        <Button asChild>
          <Link href="/new">
            <FilePlus2 className="mr-2 h-5 w-5" />
            New Form
          </Link>
        </Button>
      ) : (
        <Button asChild>
          <Link href="/">
            <MessageSquareQuote className="mr-2 h-5 w-5" />
            Your Responses
          </Link>
        </Button>
      )}
    </header>
  );
};
