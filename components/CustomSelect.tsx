import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type CustomSelectProps = {
  setValue: (value: string) => void;
  values: string[];
  label: string;
  placeholder: string;
};

function CustomSelect({
  setValue,
  values,
  label,
  placeholder,
}: CustomSelectProps) {
  return (
    <div className="space-y-1">
      <Label className="leading-normal">{label}</Label>
      <Select onValueChange={(value: string) => setValue(value)}>
        <SelectTrigger>
          <SelectValue placeholder={placeholder}></SelectValue>
        </SelectTrigger>
        <SelectContent>
          {values.map((productType) => (
            <SelectItem value={productType} key={productType}>
              {productType}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default CustomSelect;
