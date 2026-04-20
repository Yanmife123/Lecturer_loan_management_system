export type LoanFormData = {
  // Step 1
  loan_amount: number;
  repayment_period: number;
  bank_name: string;
  bank_account_number: string;

  // Step 2
  borrower_signature: string;

  // Step 3
  passport_photo_1: FileList;
  passport_photo_2: FileList;
  salary_deduction_signature: string;

  // Step 4
  guarantor1_email: string;
  guarantor2_email: string;
};

export type LoanStep = 1 | 2 | 3 | 4 | 5;

export type GuarantorStatus = "pending" | "accepted" | "rejected";

export type LoanPayload = {
  loan_amount: number;
  repayment_period: number;
  bank_name: string;
  bank_account_number: string;
  borrower_signature: string;
  salary_deduction_signature: string;
  guarantor1_email: string;
  guarantor2_email: string;
};
