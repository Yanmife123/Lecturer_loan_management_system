export interface MemberSuggestionSingle {
  membership_no: string;
  full_name: string;
}

export interface MemberSuggestion {
  status: boolean;
  message: string;
  data: MemberSuggestionSingle[];
}

export interface Schedule {
  id: number;
  installment_no: number;
  due_date: string;
  due_month_label: string;
  monthly_payment: number; // JSON shows strings "45000.00"
  principal_amount: string | number;
  interest_amount: string | number;
  opening_balance: string | number;
  closing_balance: string | number;
  total_paid: number;
  balance_remaining: number;
  status: "pending" | "paid" | "overdue" | "partial";
  is_payable: boolean;
  label: string;
}

export interface LoanDetails {
  id: number;
  loan_type: string;
  loan_amount: number;
  duration: string;
  total_due: number;
  total_paid: number;
  outstanding: number;
}

export interface MemberLoan {
  member: MemberSuggestionSingle;
  loan: LoanDetails;
  schedules: Schedule[];
}

// This matches the specific JSON response you provided
export interface ActiveLoanResponse {
  status: boolean;
  message: string;
  data: MemberLoan;
}
