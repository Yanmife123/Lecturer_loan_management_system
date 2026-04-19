export interface MembershipDetail {
  id: number;
  user_id: number;
  membership_no: string;
  effective_date_of_membership: string; // Typically "YYYY-MM-DD"
  total_oustanding_loan: string; // API returns string "0.00"
  total_saving: string; // API returns string "0.00"
  general_secretary_approved_by: number | null;
  general_secretary_approved_at: string | null;
  President_approved_by: number | null; // Note the capital 'P' from your log
  president_approved_at: string | null;
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
  phone_number: string;
  gender: "male" | "female" | string;
  marital_status: "single" | "married" | string;
  residential_address: string;
  permanent_address: string;
  member_type: "new" | "existing" | string;
  role: string;
  status: "pending" | "approved" | "under_review" | string;
  membership_detail: MembershipDetail | null;
  created_at: string;
  updated_at: string;
}
