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
  scretary_id: number; // Note: maintaining the typo from your JSON
  guarantor_id: User;
  guarantor_approval: number;
  guarantor_approval_at: string;
  created_at: string;
  updated_at: string;
  user: User;
  loan_approval: LoanApproval;
  scretary_approval: Partial<User>; // Based on the provided snippet
  loan_type: LoanType;
}

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
  membership_detail?: MembershipDetail;
  member_info?: MemberInfo;
}

export interface MembershipDetail {
  id: number;
  user_id: number;
  membership_no: string;
  effective_date_of_membership: string;
  total_oustanding_loan: string;
  total_saving: string;
  general_secretary_approved_by: number | null;
  President_approved_by: number | null;
  president_approved_at: string | null;
  general_secretary_approved_at: string | null;
  activated_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface MemberInfo {
  id: number;
  user_id: number;
  faculty: string;
  department: string;
  date_of_first_appointment: string;
  designation: string;
  salary_scale_level: string;
  salary_scale_step: string;
  staff_file_no: string;
  signature_path: string;
  monthly_saving_amount: string;
  nok_full_name: string;
  nok_relationship: string;
  nok_phone: string;
  nok_email: string;
  nok_address: string;
  created_at: string;
  updated_at: string;
}

export interface LoanApproval {
  id: number;
  loan_application_id: number;
  stage: string;
  secretary_id: number | null;
  president_id: number | null;
  action: string;
  comment: string | null;
  actioned_at: string | null;
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
