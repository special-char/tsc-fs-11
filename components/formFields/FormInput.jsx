import React from 'react';
import { Input } from '../ui/input';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';

function FormInput({ label, desc, field }) {
  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <Input placeholder="shadcn" {...field} />
      </FormControl>
      {desc && <FormDescription>{desc}</FormDescription>}
      <FormMessage />
    </FormItem>
  );
}

export default FormInput;
