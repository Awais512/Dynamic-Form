// import { FormSchema } from "../types/form";

// export const loginFormSchema: FormSchema = {
//   fields: [
//     {
//       type: "email",
//       name: "email",
//       label: "Email",
//       placeholder: "Enter your email",
//       validation: {
//         required: true,
//         pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
//         message: "Please enter a valid email",
//       },
//     },
//     {
//       type: "password",
//       name: "password",
//       label: "Password",
//       validation: {
//         required: true,
//         minLength: 8,
//         message: "Password must be at least 8 characters",
//       },
//     },
//   ],
// };

// export const registrationFormSchema: FormSchema = {
//   fields: [
//     {
//       type: "text",
//       name: "fullName",
//       label: "Full Name",
//       validation: {
//         required: true,
//         minLength: 2,
//         message: "Please enter your full name",
//       },
//     },
//     {
//       type: "email",
//       name: "email",
//       label: "Email",
//       validation: {
//         required: true,
//         pattern: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$",
//         message: "Please enter a valid email",
//       },
//     },
//     {
//       type: "password",
//       name: "password",
//       label: "Password",
//       validation: {
//         required: true,
//         minLength: 8,
//         message: "Password must be at least 8 characters",
//       },
//     },
//     {
//       type: "select",
//       name: "role",
//       label: "Role",
//       options: [
//         { label: "User", value: "user" },
//         { label: "Admin", value: "admin" },
//       ],
//       validation: {
//         required: true,
//       },
//     },
//     {
//       type: "checkbox",
//       name: "acceptTerms",
//       label: "I accept the terms and conditions",
//       validation: {
//         required: true,
//         message: "You must accept the terms and conditions",
//       },
//     },
//   ],
// };

import { z } from "zod";
import { FormSchema } from "../types/form";

// Login Form Schema
const loginZodSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    ),
});

export const loginFormSchema: FormSchema = {
  zodSchema: loginZodSchema,
  fields: [
    {
      type: "email",
      name: "email",
      label: "Email Address",
      placeholder: "Enter your email",
      required: true,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      required: true,
      description:
        "Must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special character",
    },
  ],
};

// Registration Form Schema
const registrationZodSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .max(50, "First name must be less than 50 characters"),
    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters")
      .max(50, "Last name must be less than 50 characters"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    role: z.string().min(1, "Please select a role"),
    terms: z
      .boolean()
      .refine(
        (val) => val === true,
        "You must accept the terms and conditions"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const registrationFormSchema: FormSchema = {
  zodSchema: registrationZodSchema,
  fields: [
    {
      type: "text",
      name: "firstName",
      label: "First Name",
      required: true,
    },
    {
      type: "text",
      name: "lastName",
      label: "Last Name",
      required: true,
    },
    {
      type: "email",
      name: "email",
      label: "Email",
      required: true,
    },
    {
      type: "password",
      name: "password",
      label: "Password",
      required: true,
    },
    {
      type: "password",
      name: "confirmPassword",
      label: "Confirm Password",
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
      ],
    },
    {
      type: "checkbox",
      name: "terms",
      label: "I accept the terms and conditions",
      required: true,
    },
  ],
};

// Contact Form Schema
const contactZodSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  subject: z
    .string()
    .min(1, "Subject is required")
    .max(200, "Subject must be less than 200 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
  attachment: z
    .instanceof(FileList)
    .optional()
    .refine(
      (files) => !files || files.length <= 3,
      "Maximum of 3 files allowed"
    )
    .refine(
      (files) =>
        !files ||
        Array.from(files).every((file) => file.size <= 5 * 1024 * 1024),
      "Files must be less than 5MB"
    ),
});

export const contactFormSchema: FormSchema = {
  zodSchema: contactZodSchema,
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
      label: "Attachments",
      accept: ".pdf,.doc,.docx,.txt",
      multiple: true,
      maxSize: 5 * 1024 * 1024, // 5MB
      description:
        "Maximum 3 files, 5MB each. Accepted formats: PDF, DOC, DOCX, TXT",
    },
  ],
};
