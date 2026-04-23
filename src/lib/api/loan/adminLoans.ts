import { Instance1 } from "@/lib/axios";

import { axiosResponseHandle } from "@/lib/response";

export async function AllRequest(page = 1) {
  const response = await Instance1.get("/admin/loans/pending", {
    params: { page },
  });
  return axiosResponseHandle(response);
}
export async function AllReviews(page = 1) {
  const response = await Instance1.get("/admin/loans/reviews", {
    params: { page },
  });
  return axiosResponseHandle(response);
}
export async function AllReviewsExcutive(page = 1) {
  const response = await Instance1.get("/admin/loans/executives", {
    params: { page },
  });
  return axiosResponseHandle(response);
}

export async function SingleRequest(id: string) {
  const response = await Instance1.get(`/admin/loans/${id}`);
  return axiosResponseHandle(response);
}

// secretary apporve and decline api

export async function SecretaryApprove(id: string) {
  const response = await Instance1.post(`/admin/loans/${id}/secretary-approve`);
  return axiosResponseHandle(response);
}

// chairman apporve and decline api

export async function ChairmanApprove(id: string) {
  const response = await Instance1.post(`/admin/loans/${id}/chairman-approve`);
  return axiosResponseHandle(response);
}

// president apporve and decline api

export async function PresidentApprove(id: string) {
  const response = await Instance1.post(`/admin/loans/${id}/president-approve`);
  return axiosResponseHandle(response);
}

// Gen_Sec apporve and decline api

export async function GenSecApprove(id: string) {
  const response = await Instance1.post(
    `/admin/loans/${id}/genSecretary-approve`,
  );
  return axiosResponseHandle(response);
}
