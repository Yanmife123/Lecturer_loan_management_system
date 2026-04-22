import { Instance1 } from "@/lib/axios";
import { axiosResponseHandle } from "@/lib/response";

export async function allGuarantorRequest(page = 1) {
  const response = await Instance1.get("/loans/guarantor", {
    params: { page },
  });
  return axiosResponseHandle(response);
}
export async function singleGuarantorRequest(id: string) {
  const response = await Instance1.get(`/loans/guarantor/${id}`);
  return axiosResponseHandle(response);
}
export async function GuarantorAccept(id: string) {
  const response = await Instance1.put(`/loans/guarantor/${id}/accept`);
  return axiosResponseHandle(response);
}
export async function GuarantorDecline(id: string) {
  const response = await Instance1.put(`/loans/guarantor/${id}/decline`);
  return axiosResponseHandle(response);
}
