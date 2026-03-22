import * as z from "zod";

// ─── Step 1 Schema ────────────────────────────────────────────────────────────
export const step1Schema = z.object({
  prefix: z.string().min(1, "Prefix is required"),
  otherNames: z.string().min(1, "First name is required"),
  surname: z.string().min(1, "Last name is required"),
  staffId: z.string().min(1, "Staff ID is required"),
  email: z.string().email("Invalid email"),
});

// ─── Step 2 Schema ────────────────────────────────────────────────────────────
export const step2Schema = z.object({
  surname: z.string().min(1, "Surname is required"),
  otherNames: z.string().min(1, "Other names are required"),
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
  salaryScaleStep: z.string().min(1, "Salary scale is required"),
  file_no: z.string().min(1, "Staff file number is required"),
  telephoneNo: z.string().min(1, "Telephone number is required"),
  residentialAddress: z.string().min(1, "Residential address is required"),
  permanentHomeAddress: z.string().min(1, "Permanent home address is required"),
});

// ─── Step 3 Schema ────────────────────────────────────────────────────────────
export const step3Schema = z.object({
  nokFullName: z.string().min(1, "Full name is required"),
  nokRelationship: z.string().min(1, "Relationship is required"),
  nokContactAddress: z.string().min(1, "Contact address is required"),
  nokPhoneNumber: z.string().min(1, "Phone number is required"),
  nokEmail: z.string().email("Invalid email"),
});

// ─── Inferred Types ───────────────────────────────────────────────────────────
export type Step1FormData = z.infer<typeof step1Schema>;
export type Step2FormData = z.infer<typeof step2Schema>;
export type Step3FormData = z.infer<typeof step3Schema>;
export type AllFormData = Partial<
  Step1FormData & Step2FormData & Step3FormData
>;
