import { FileInstance1, Instance1 } from "@/lib/axios";
import { axiosResponseHandle } from "@/lib/response";

export async function CreateLoanApplication(formData: FormData) {
  const response = await FileInstance1.post("/loans", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return axiosResponseHandle(response);
}

export async function getallMyLoan(page = 1) {
  const response = await Instance1.get("/loans", {
    params: { page },
  });
  return axiosResponseHandle(response);
}
