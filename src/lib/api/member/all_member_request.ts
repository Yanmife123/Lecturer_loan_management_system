import { Instance1 } from "@/lib/axios";
import { axiosResponseHandle } from "@/lib/response";

export async function allMemberRequestsPending(page = 1) {
  const response = await Instance1.get("/admin/members/pending", {
    params: { page },
  });
  return axiosResponseHandle(response);
}
export async function MemberRequestsPendingSingle(id: string) {
  const response = await Instance1.get(`/admin/members/pending/${id}`);
  return axiosResponseHandle(response);
}

export async function allMemberRequestsReviews(page = 1) {
  const response = await Instance1.get("/admin/members/reviews", {
    params: { page },
  });
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
    total_oustanding_loan: number;
    total_saving: number;
  };
}) {
  const response = await Instance1.post(
    `/admin/member/${id}/underview`,

    data,
  );
  return axiosResponseHandle(response);
}
