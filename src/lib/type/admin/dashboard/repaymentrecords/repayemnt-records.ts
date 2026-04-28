export interface RepaymentResponse {
  id: number;
  loan_application_id: number;
  repayment_schedule_id: number;
  amount_paid: string; // Keep as string if it remains "45000.00" from JSON
  payment_date: string;
  payment_method: string;
  recorded_by: UserProfile;
  note: string | null;
  created_at: string;
  updated_at: string;
  loan_application: LoanApplication;
  repayment_schedule: RepaymentSchedule;
}

export interface LoanType {
  id: number;
  name: string;
  interest_rate: string;
  interest_type: "flat" | "reducing"; // Based on common loan logic
  max_amount: string;
  max_duration_months: number;
  collection_period: string;
  submission_period: string;
  is_active: number; // 1 for true, 0 for false
  created_at: string;
  updated_at: string;
}

export interface UserProfile {
  id: number;
  surname: string;
  other_names: string;
  prefix: string;
  email?: string; // Optional as it appears in nested user but not recorded_by
}

export interface LoanApplication {
  id: number;
  user_id: number;
  loan_type_id: number;
  amount: string;
  duration_month: number;
  purpose: string;
  gross_salary: string;
  net_salary: string;
  pay_slip: string;
  bank_name: string;
  bank_account_number: string;
  monthly_saving_during_repayments: string;
  status: string;
  decline_reason: string | null;
  secretary_comment: string | null;
  scretary_id: number;
  guarantor_id: number;
  guarantor_approval: number;
  guarantor_approval_at: string;
  created_at: string;
  updated_at: string;
  user: UserProfile;
  loan_type: LoanType;
}

export interface RepaymentSchedule {
  id: number;
  installment_no: number;
  due_date: string;
  monthly_payment: string;
  status: "paid" | "pending" | string; // Union type based on your data
}
