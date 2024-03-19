import React from 'react';
import { useController } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

function FormSelect({ field, options, desc, label }) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select a verified email to display" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {options.map(x => (
            <SelectItem key={x.value} value={x.value}>
              {x.text}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {desc && <FormDescription>{desc}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

export default FormSelect;
