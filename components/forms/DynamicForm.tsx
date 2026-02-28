import React from 'react';
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { Control, Path, useForm } from 'react-hook-form';
import z, { ZodObject, ZodRawShape } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

type FieldType =
   | 'text'
   | 'number'
   | 'email'
   | 'password'
   | 'checkbox'
   | 'select';

interface FieldOption {
   label: string;
   value: string | number;
}

export type FieldConfig<TSchema extends ZodObject<any>> = {
   name: Path<z.infer<TSchema>>;
   label: string;
   type?: FieldType;
   options?: FieldOption[];
};

type DynamicFormProps<TSchema extends ZodObject<ZodRawShape>> = {
   schema: TSchema;
   fields: FieldConfig<TSchema>[];
   onSubmit: (data: z.infer<TSchema>) => void;
   btnText?: string;
   forgetBtn?: boolean;
} & React.FormHTMLAttributes<HTMLFormElement>;

export function DynamicForm<TSchema extends ZodObject<ZodRawShape>>({
   schema,
   fields,
   onSubmit,
   btnText,
   forgetBtn = false,
}: DynamicFormProps<TSchema>) {
   const form = useForm<z.input<TSchema>, any, z.output<TSchema>>({
      resolver: zodResolver(schema),
      defaultValues: Object.fromEntries(
         Object.keys(schema.shape).map((key) => [key, ''])
      ) as any,
      mode: 'onSubmit',
      reValidateMode: 'onSubmit',
   });

   return (
      <Form {...form}>
         <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col w-full gap-4"
         >
            {fields.map((field) => (
               <FormField<z.input<TSchema>>
                  key={field.name}
                  control={form.control as Control<z.input<TSchema>>}
                  name={field.name as Path<z.input<TSchema>>}
                  render={({ field: rhfField }) => (
                     <FormItem>
                        <FormControl>
                           <Input
                              type={field.type || 'text'}
                              name={rhfField.name}
                              value={
                                 rhfField.value as string | number | undefined
                              }
                              onChange={(e) =>
                                 rhfField.onChange(
                                    field.type === 'number'
                                       ? Number(e.target.value)
                                       : e.target.value
                                 )
                              }
                              onBlur={rhfField.onBlur}
                              ref={rhfField.ref}
                              placeholder={field.label}
                              className="shadow-none border textBody h-auto border-neutralWhite-400 rounded-sm py-2.5 px-6"
                           />
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />
            ))}
            {forgetBtn && (
               <button className="textLabel text-neutralBlack-500 self-end cursor-pointer">
                  Забыли пароль?
               </button>
            )}
            <button
               type="submit"
               className="bg-neutralBlack-900 mt-8 text-neutralWhite-100 rounded-[6px] py-2.5 cursor-pointer hover:bg-neutralBlack-850 transition"
            >
               {btnText ? btnText : 'Отправить'}
            </button>
         </form>
      </Form>
   );
}

export default DynamicForm;
