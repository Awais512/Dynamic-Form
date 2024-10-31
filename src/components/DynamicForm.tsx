import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProps, FormField as IFormField } from "../types/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Form,
} from "@/components/ui/form";

const DynamicForm: React.FC<FormProps> = ({
  schema,
  onSubmit,
  defaultValues = {},
  className = "",
}) => {
  const form = useForm({
    resolver: zodResolver(schema.zodSchema),
    defaultValues,
  });

  const renderField = (field: IFormField) => {
    return (
      <FormField
        control={form.control}
        name={field.name}
        render={({ field: formField }) => (
          <FormItem>
            {field.type !== "checkbox" && (
              <FormLabel>
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </FormLabel>
            )}
            <FormControl>
              {(() => {
                switch (field.type) {
                  case "textarea":
                    return (
                      <Textarea
                        {...formField}
                        placeholder={field.placeholder}
                        rows={field.rows || 3}
                      />
                    );

                  case "select":
                    return (
                      <Select
                        onValueChange={formField.onChange}
                        defaultValue={formField.value}
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              field.placeholder || "Select an option"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {field.options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );

                  case "checkbox":
                    return (
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          checked={formField.value}
                          onCheckedChange={formField.onChange}
                        />
                        <label
                          htmlFor={field.name}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {field.label}
                        </label>
                      </div>
                    );

                  case "radio":
                    return (
                      <RadioGroup
                        onValueChange={formField.onChange}
                        defaultValue={formField.value}
                        className="flex flex-col space-y-1"
                      >
                        {field.options.map((option) => (
                          <div
                            key={option.value}
                            className="flex items-center space-x-2"
                          >
                            <RadioGroupItem
                              value={option.value}
                              id={option.value}
                            />
                            <Label htmlFor={option.value}>{option.label}</Label>
                          </div>
                        ))}
                      </RadioGroup>
                    );

                  case "file":
                    return (
                      <Input
                        type="file"
                        accept={field.accept}
                        multiple={field.multiple}
                        onChange={(e) => {
                          formField.onChange(e.target.files);
                        }}
                      />
                    );

                  default:
                    return (
                      <Input
                        {...formField}
                        type={field.type}
                        placeholder={field.placeholder}
                      />
                    );
                }
              })()}
            </FormControl>
            {field.description && (
              <FormDescription>{field.description}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={`space-y-6 ${className}`}
      >
        {schema.fields.map((field) => (
          <div key={field.name}>{renderField(field)}</div>
        ))}
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default DynamicForm;
