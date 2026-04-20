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

export interface MembershipDetail {
  id: number;
  user_id: number;
  membership_no: string;
  effective_date_of_membership: string;
  total_oustanding_loan: string;
  total_saving: string;
  general_secretary_approved_by: string | null;
  President_approved_by: string | null;
  president_approved_at: string | null;
  general_secretary_approved_at: string | null;
  activated_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface Member {
  id: number;
  prefix: string;
  surname: string;
  other_names: string;
  email: string;
  role: "admin" | "member";
  member_type: "old" | "new";
  status: "active" | "inactive";
  gender: "male" | "female" | "other";
  date_of_birth: string;
  marital_status: "single" | "married" | "divorced" | "widowed";
  residential_address: string;
  permanent_address: string;
  phone_number: string;
  created_at: string;
  updated_at: string;
  member_info: MemberInfo;
  membership_detail: MembershipDetail;
}
