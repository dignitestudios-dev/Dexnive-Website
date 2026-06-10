"use client";

import * as React from "react";
import PhoneInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import en from "react-phone-number-input/locale/en.json";
import { getCountries, getCountryCallingCode } from "react-phone-number-input/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const CustomCountrySelect = ({ value, onChange, labels, ...rest }: any) => {
  return (
    <Select value={value || ""} onValueChange={(val) => onChange(val === "" ? undefined : val)}>
      <SelectTrigger className="w-max gap-2 bg-transparent border-0 focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 p-2 text-white outline-none">
        <SelectValue placeholder="🌍">
          {value && flags[value as keyof typeof flags] ? (
            <span className="flex items-center gap-2">
              {React.createElement(flags[value as keyof typeof flags] as any, { className: "w-5 h-3.5 object-cover rounded-sm" })}
              <span className="text-white">+{getCountryCallingCode(value)}</span>
            </span>
          ) : (
            "🌍"
          )}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="bg-black text-white border-[#840ECD] z-50">
        {getCountries().map((country: any) => {
          const Flag = flags[country as keyof typeof flags] as any;
          return (
            <SelectItem key={country} value={country}>
              <span className="flex items-center gap-2">
                {Flag ? <Flag className="w-5 h-3.5 object-cover rounded-sm" /> : null}
                <span>{(en as any)[country]}</span>
                <span className="text-gray-400">+{getCountryCallingCode(country)}</span>
              </span>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export const CustomPhoneInput = React.forwardRef<any, any>(
  ({ className, numberInputProps, ...props }, ref) => {
    return (
      <PhoneInput
        {...props}
        ref={ref}
        limitMaxLength={true}
        countrySelectComponent={CustomCountrySelect}
        className={cn(
          "flex items-center rounded-lg border border-[#840ECD] bg-white/10 px-2 py-1 focus-within:ring-1 focus-within:ring-purple-500",
          className
        )}
        numberInputProps={{
          ...numberInputProps,
          className: cn(
            "bg-transparent outline-none w-full text-white placeholder:text-white/40 ml-2 py-2",
            numberInputProps?.className
          ),
        }}
      />
    );
  }
);
CustomPhoneInput.displayName = "CustomPhoneInput";
