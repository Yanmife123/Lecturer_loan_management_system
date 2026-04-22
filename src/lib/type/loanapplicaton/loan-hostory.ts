export interface User {
  id: number;
  prefix: string;
  surname: string;
  other_names: string;
  email: string;
  role: string;
  member_type: string;
  status: string;
  gender: string;
  date_of_birth: string;
  marital_status: string;
  residential_address: string;
  permanent_address: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
}

export interface LoanType {
  id: number;
  name: string;
  interest_rate: string;
  interest_type: "reducing_balance" | "flat_rate" | string;
  max_amount: string | null;
  max_duration_months: number;
  collection_period: string;
  submission_period: string;
  is_active: number; // usually 0 or 1
  created_at: string;
  updated_at: string;
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
  status: "pending" | "approved" | "declined";
  decline_reason: string | null;
  secretary_comment: string | null;
  scretary_id: number | null; // Note: typo 'scretary' preserved from your JSON

  // Relationships
  guarantor_id: User;
  loan_type: LoanType;

  guarantor_approval: number;
  guarantor_approval_at: string | null;
  created_at: string;
  updated_at: string;
}
