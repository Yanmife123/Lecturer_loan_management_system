import { FileInstance1, Instance1 } from "@/lib/axios";
import { axiosResponseHandle } from "@/lib/response";

export async function CreateLoanApplication(formData: FormData) {
  const response = await FileInstance1.post("/loans", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return axiosResponseHandle(response);
}
