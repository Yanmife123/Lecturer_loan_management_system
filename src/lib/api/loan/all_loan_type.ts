import { Instance1 } from "@/lib/axios";
import { axiosResponseHandle } from "@/lib/response";

export interface LoanTypeT {
  id: number;
  name: string;
  max_amount: string | null;
  max_duration_months: number;
  interest_rate: string;
  interest_type: string;
  is_active: number | boolean;
  submission_period: string;
  collection_period: string;
  created_at: string;
  updated_at: string;
}

export interface LoanTypeArrary {
  status: boolean;
  data: LoanTypeT[];
}

export async function allLoanType() {
  const response = await Instance1.get("/loan-types");
  return axiosResponseHandle(response);
}

export async function SingleLoan(id: string) {
  const response = await Instance1.get(`/loan-types/${id}`);
  return axiosResponseHandle(response);
}
