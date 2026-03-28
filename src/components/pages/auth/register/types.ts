import * as z from "zod";

const MAX_FILE_SIZE = 2048 * 1024; // 2MB in bytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const fileListSchema = z.custom<FileList>(
  (val) => typeof window === "undefined" || val instanceof FileList,
  { message: "Invalid file input" },
);

// ─── Step 1 Schema ────────────────────────────────────────────────────────────
export const step1Schema = z.object({
  prefix: z.string().min(1, "Prefix is required"),
  otherNames: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Last name is required"),
  // staffId: z.string().min(1, "Staff ID is required"),
  phone: z.string().min(1, "Telephone number is required"),
  email: z.string().email("Invalid email"),
  monthlySaving: z.string().min(1, "Monthly saving is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
});

// ─── Step 2 Schema ────────────────────────────────────────────────────────────
export const step2Schema = z.object({
  // surname: z.string().min(1, "Surname is required"),
  // otherNames: z.string().min(1, "Other names are required"),
  gender: z.string().min(1, "Gender is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  maritalStatus: z.string().min(1, "Marital status is required"),
  faculty: z.string().min(1, "Faculty is required"),
  department: z.string().min(1, "Department/Unit is required"),
  dateOfFirstAppointment: z
    .string()
    .min(1, "Date of first appointment is required"),
  designation: z.string().min(1, "Present designation is required"),
  salaryScaleLevel: z.string().min(1, "Salary scale is required"),
  salaryScaleStep: z.string().min(1, "Salary step is required"),
  file_no: z.string().min(1, "Staff file number is required"),
  // telephoneNo: z.string().min(1, "Telephone number is required"),
  residentialAddress: z.string().min(1, "Residential address is required"),
  permanentAddress: z.string().min(1, "Permanent home address is required"),

  signature: fileListSchema
    .refine((files) => files.length > 0, "Signature is required")
    .refine((files) => files[0]?.size <= MAX_FILE_SIZE, "Max file size is 2MB")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "Only .jpg and .png files are accepted",
    ),
});

// ─── Step 3 Schema ────────────────────────────────────────────────────────────
export const step3Schema = z.object({
  nokFullName: z.string().min(1, "Full name is required"),
  nokRelationship: z.string().min(1, "Relationship is required"),
  nokContactAddress: z.string().min(1, "Contact address is required"),
  nokPhone: z.string().min(1, "Phone number is required"),
  nokEmail: z.string().email("Invalid email"),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────
export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type AllFormData = Partial<
  Step1FormData & Step2FormData & Step3FormData
>;
