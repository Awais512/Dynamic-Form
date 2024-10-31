import { z } from "zod";

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"
  | "date"
  | "textarea"
  | "select"
  | "checkbox"
  | "radio"
  | "file";

interface BaseField {
  name: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  description?: string;
  required?: boolean;
  className?: string;
}

interface TextField extends BaseField {
  type: "text" | "email" | "password" | "tel" | "url";
  minLength?: number;
  maxLength?: number;
  pattern?: string;
}

interface NumberField extends BaseField {
  type: "number";
  min?: number;
  max?: number;
}

interface TextareaField extends BaseField {
  type: "textarea";
  rows?: number;
  minLength?: number;
  maxLength?: number;
}

interface SelectField extends BaseField {
  type: "select";
  options: { label: string; value: string }[];
  multiple?: boolean;
}

interface CheckboxField extends BaseField {
  type: "checkbox";
}

interface RadioField extends BaseField {
  type: "radio";
  options: { label: string; value: string }[];
}

interface FileField extends BaseField {
  type: "file";
  accept?: string;
  multiple?: boolean;
  maxSize?: number;
}

export type FormField =
  | TextField
  | NumberField
  | TextareaField
  | SelectField
  | CheckboxField
  | RadioField
  | FileField;

export interface FormSchema {
  fields: FormField[];
  zodSchema: z.ZodType<any>;
}

export interface FormProps {
  schema: FormSchema;
  onSubmit: (data: any) => void;
  defaultValues?: Record<string, any>;
  className?: string;
}
