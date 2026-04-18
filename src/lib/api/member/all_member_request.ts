import { Instance1 } from "@/lib/axios";
import { axiosResponseHandle } from "@/lib/response";

export async function allMemberRequestsPending() {
  const response = await Instance1.get("/admin/members/pending");
  return axiosResponseHandle(response);
}
export async function MemberRequestsPendingSingle(id: string) {
  const response = await Instance1.get(`/admin/members/pending/${id}`);
  return axiosResponseHandle(response);
}

export async function allMemberRequestsReviews() {
  const response = await Instance1.get("/admin/members/reviews");
  return axiosResponseHandle(response);
}
export async function MemberRequestsReviewsSingle(id: string) {
  const response = await Instance1.get(`/admin/members/reviews/${id}`);
  return axiosResponseHandle(response);
}

// only gen_sec and sec with admin that can perform this action( putting pending member under review)
export async function putPendingMemberUnderReview({
  id,
  data,
}: {
  id: string;
  data: {
    membership_no: string;
    effective_date_of_membership: Date;
    total_outstanding_loan: number;
    total_saving: number;
  };
}) {
  const response = await Instance1.post(
    `/admin/members/pending/${id}/underreview`,
    data,
  );
  return axiosResponseHandle(response);
}
