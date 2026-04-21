import { FileInstance1, Instance1 } from "@/lib/axios";
import { axiosResponseHandle } from "@/lib/response";

// export type LoanFormData = {
//   // Step 1
//   amount: number;
//   duration_month: number;
//   bank_name: string;
//   bank_account: string;
//   net_salary: number;
//   gross_salary: number;
//   purpose: string;
//   pay_slip: FileList;
//   // Step 2
//   // borrower_signature: string;

//   // Step 3
//   salary_deduction_signature: string;

//   // Step 4
//   guarantor_email: string;
//   loan_type_id: string | number;
// };

export async function CreateLoanApplication(formData: FormData) {
  const response = await FileInstance1.post("/loans", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return axiosResponseHandle(response);
}
