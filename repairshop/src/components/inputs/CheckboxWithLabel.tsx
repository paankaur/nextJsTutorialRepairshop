"use client";

import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  message: string;
};

export function CheckboxWithLabel<S>({
  fieldTitle,
  nameInSchema,
  message,
}: Props<S>) {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem className="flex flex-full items-center">
          <FormLabel className="text-base w=1/3 mt-2" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>
          <div className="flex items-center gap-2">

          <FormControl>
            <Checkbox
              id={nameInSchema}
              className="w-4 h-4"
              {...field}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
