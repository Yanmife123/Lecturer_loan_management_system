export type LoanFormData = {
  // Step 1
  amount: number;
  duration_month: number;
  bank_name: string;
  bank_account: string;
  net_salary: number;
  gross_salary: number;
  purpose: string;
  pay_slip: FileList;
  monthly_saving_during_repayments: number;
  // Step 2
  // borrower_signature: string;

  // Step 3
  // salary_deduction_signature: string;

  // Step 4
  guarantor_email: string;
};

export type LoanStep = 1 | 2 | 3 | 4 | 5;

export type GuarantorStatus = "pending" | "accepted" | "rejected";

export type LoanPayload = {
  // Step 1
  amount: number;
  duration_month: number;
  bank_name: string;
  bank_account: string;
  net_salary: number;
  gross_salary: number;
  purpose: string;
  pay_slip: FileList;
  // Step 2
  // borrower_signature: string;

  // Step 3
  salary_deduction_signature: string;
  monthly_saving_during_repayments: number;

  // Step 4
  guarantor_email: string;
};
