import { AlertCircle, Info, X } from "lucide-react";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { useState } from "react";

export const SelectCard = ({
  error,
  onValueChange,
  value,
}: {
  error: string[];
  onValueChange: (value: string) => void;
  value: string | undefined;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2">
      <Label className="text-sm font-semibold flex items-center">
        Reason to Contact*{" "}
        {error && (
          <TooltipProvider>
            <Tooltip open={open}>
              <TooltipTrigger tabIndex={-1}>
                <AlertCircle
                  className="h-4 w-4 ml-1 stroke-destructive cursor-pointer"
                  onClick={() => setOpen(true)}
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
      <Select onValueChange={onValueChange} defaultValue={value} value={value}>
        <SelectTrigger>
          <SelectValue placeholder={value ? value : "---"} defaultValue={value} />
        </SelectTrigger>
        <SelectContent defaultValue={value}>
          {
            ['Inquiry', 'Feedback', 'Complain', 'Other'].map((dataVal, index) => (
              <SelectItem value={dataVal} key={index}>
                { dataVal }
              </SelectItem>
            ))
          }
          {/* <SelectItem value="inquiry">Inquiry</SelectItem>
          <SelectItem value="feedback">Feedback</SelectItem>
          <SelectItem value="complain">Complain</SelectItem>
          <SelectItem value="other">Other</SelectItem> */}
        </SelectContent>
      </Select>
    </div>
  );
};
