import { Instance1 } from "@/lib/axios";
import { axiosResponseHandle } from "@/lib/response";

export async function searchMember(q: string) {
  const response = await Instance1.get("/admin/repayments/search-member", {
    params: { q },
  });
  return axiosResponseHandle(response);
}

export async function MemberLoan(membershipNo: string) {
  const response = await Instance1.get(
    `/admin/repayments/member-loan/${membershipNo}`,
  );
  return axiosResponseHandle(response);
}

export interface LoanRepaymentRequest {
  loan_application_id: number;
  repayment_schedule_id: number;
  amount_paid: number;
  payment_date: string | Date; // string for API payload, Date for local state
  payment_method: "salary_deduction" | "bank_transfer" | "cash";
}

export async function CreateRepaymentApi(data: LoanRepaymentRequest) {
  const response = await Instance1.post("/admin/loans/repayments/single", data);
  return response.data;
}

export async function AllRepaymentRecord(page = 1) {
  const response = await Instance1.get("/admin/loans/repayments/", {
    params: { page },
  });
  return axiosResponseHandle(response);
}
export async function AllRepaymentRecordMe(page = 1) {
  const response = await Instance1.get("/loans/repayments/me", {
    params: { page },
  });
  return axiosResponseHandle(response);
}
