import { AlertCircle, Info, X } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { EventHandler } from "@/types/contactData";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface InputCardProps {
  label: string;
  name: string;
  value?: string | number | boolean;
  onChangeHandler: (e: EventHandler) => void;
  error: string[] | undefined;
  required?: boolean;
  inputStyles?: string;
}

export const InputCard = ({
  label,
  name,
  value,
  onChangeHandler,
  error,
  required,
  inputStyles,
}: InputCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-2">
        <Label className="text-sm font-semibold flex items-center">
          {label}
          {!!required && "*"}{" "}
          {error && (
            <TooltipProvider>
              <Tooltip open={open}>
                <TooltipTrigger tabIndex={-1}>
                  <AlertCircle
                    className="h-4 w-4 ml-1 stroke-destructive cursor-pointer"
                    onClick={() => setOpen(true)}
                    onMouseOver={() => setOpen(true)}
                    onMouseLeave={() => setOpen(false)}
                  />
                </TooltipTrigger>
                <TooltipContent className="relative z-4 pt-8 pb-2">
                  <X
                    className="absolute top-2 right-2 w-4 h-4 cursor-pointer"
                    onClick={() => setOpen(false)}
                  />
                  {error.map((e, index) => (
                    <p key={index}>&#8226; {e}</p>
                  ))}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </Label>
        <Input
          name={name}
          onChange={onChangeHandler}
          value={value?.toString()}
          className={cn(inputStyles)}
        />
      </div>
    </>
  );
};
