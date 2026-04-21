export interface User {
  id: number;
  prefix: string;
  surname: string;
  other_names: string;
  email: string;
  role: "admin" | "user" | string; // Using string unions for better type safety
  member_type: "old" | "new" | string;
  status: "active" | "inactive" | string;
  gender: "male" | "female" | string;
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
  interest_type: string;
  max_amount: number | null;
  max_duration_months: number;
  collection_period: string;
  submission_period: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface LoanApplicationResponse {
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
  status: "pending" | "approved" | "declined" | string;
  decline_reason: string | null;
  secretary_comment: string | null;
  scretary_id: number | null;
  guarantor_id: number;
  guarantor_approval: boolean | number | null;
  guarantor_approval_at: string | null;
  created_at: string;
  updated_at: string;
  user: User;
  loan_type: LoanType;
}
