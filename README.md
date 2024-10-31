# Dynamic Form Generator

A flexible and customizable dynamic form generator built with React, TypeScript, Zod validation, and shadcn/ui components.

## Features

- 🎨 Built with shadcn/ui components
- ✨ Dynamic form generation from schema
- 🛡️ Type-safe with TypeScript
- ✅ Zod validation
- 📱 Fully responsive
- 🎯 Built-in error handling
- 🌈 Customizable styles
- 🔄 Form state management with react-hook-form

## Prerequisites

Make sure you have these dependencies installed in your project:

```bash
npm install react-hook-form @hookform/resolvers/zod zod
npm install tailwindcss
```

Install required shadcn/ui components:

```bash
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add button
npx shadcn-ui@latest add textarea
npx shadcn-ui@latest add select
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add form
```

## Usage

### Basic Example

```tsx
import { DynamicForm } from "@/components/DynamicForm";
import { z } from "zod";

// Define your Zod schema
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

// Define your form configuration
const loginFormSchema = {
  zodSchema: loginSchema,
  fields: [
    {
      type: "email",
      name: "email",
      label: "Email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      required: true,
    },
  ],
};

// Use the form component
function LoginPage() {
  const handleSubmit = (data) => {
    console.log("Form submitted:", data);
  };

  return <DynamicForm schema={loginFormSchema} onSubmit={handleSubmit} />;
}
```

### Advanced Example

```tsx
const registrationSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  role: z.string().min(1, "Please select a role"),
  bio: z.string().optional(),
  agreeToTerms: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms",
  }),
});

const registrationFormSchema = {
  zodSchema: registrationSchema,
  fields: [
    {
      type: "text",
      name: "fullName",
      label: "Full Name",
      placeholder: "John Doe",
      required: true,
      description: "Enter your full name as it appears on official documents",
    },
    {
      type: "email",
      name: "email",
      label: "Email Address",
      required: true,
    },
    {
      type: "select",
      name: "role",
      label: "Role",
      required: true,
      options: [
        { label: "User", value: "user" },
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
      ],
    },
    {
      type: "textarea",
      name: "bio",
      label: "Bio",
      placeholder: "Tell us about yourself",
      rows: 4,
    },
    {
      type: "checkbox",
      name: "agreeToTerms",
      label: "I agree to the terms and conditions",
      required: true,
    },
  ],
};
```

## Supported Field Types

- `text` - Basic text input
- `email` - Email input with validation
- `password` - Password input
- `number` - Numeric input
- `textarea` - Multiline text input
- `select` - Dropdown selection
- `checkbox` - Single checkbox
- `radio` - Radio button group
- `file` - File upload input
- `date` - Date input
- `tel` - Telephone input
- `url` - URL input

## Form Field Properties

```typescript
interface FormField {
  type: FieldType;
  name: string;
  label: string;
  placeholder?: string;
  description?: string;
  required?: boolean;
  className?: string;
  options?: { label: string; value: string }[]; // For select/radio
  rows?: number; // For textarea
  accept?: string; // For file input
  multiple?: boolean; // For file input
  min?: number; // For number input
  max?: number; // For number input
  minLength?: number; // For text input
  maxLength?: number; // For text input
}
```

## Props

The DynamicForm component accepts the following props:

```typescript
interface FormProps {
  schema: {
    zodSchema: z.ZodType;
    fields: FormField[];
  };
  onSubmit: (data: any) => void;
  defaultValues?: Record<string, any>;
  className?: string;
}
```

## Styling

The form uses Tailwind CSS classes for styling. You can customize the appearance by:

1. Passing className prop to the form
2. Modifying the default Tailwind classes in the component
3. Using shadcn/ui theme customization

## Error Handling

Form validation errors are automatically displayed below each field. The validation rules are defined in your Zod schema.

## Examples

### Contact Form

```tsx
const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  subject: z.string().min(5, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  attachment: z.any().optional(),
});

const contactFormSchema = {
  zodSchema: contactSchema,
  fields: [
    {
      type: "text",
      name: "name",
      label: "Name",
      required: true,
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      required: true,
    },
    {
      type: "text",
      name: "subject",
      label: "Subject",
      required: true,
    },
    {
      type: "textarea",
      name: "message",
      label: "Message",
      required: true,
      rows: 4,
    },
    {
      type: "file",
      name: "attachment",
      label: "Attachment",
      accept: ".pdf,.doc,.docx",
      description: "Upload any relevant documents (PDF, DOC)",
    },
  ],
};
```

## Tips

1. Always define your Zod schema first
2. Use descriptive field names
3. Provide helpful error messages in your schema
4. Add field descriptions for complex inputs
5. Use TypeScript for better type safety
6. Test your forms with various input scenarios
7. Handle form submission errors appropriately

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

MIT
