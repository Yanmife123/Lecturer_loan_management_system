import { FileInstance1, Instance1 } from "@/lib/axios";
import { axiosResponseHandle } from "@/lib/response";

interface SavingSingle {
  email: string;
  amount: number;
  month: number;
  year: number;
  payment_method: string;
}

export async function CreateSavingSingle(data: SavingSingle) {
  const response = await Instance1.post("/savings/single", data);
  return axiosResponseHandle(response);
}

export async function createBulkSaving(data: FormData) {
  const response = await FileInstance1.post("/savings/bulk", data);
  return response.data;
}

export async function allSaving(page = 1) {
  const response = await Instance1.get("/savings", {
    params: { page },
  });
  return axiosResponseHandle(response);
}
export async function MySaving(page = 1) {
  const response = await Instance1.get("/savings/me", {
    params: { page },
  });
  return axiosResponseHandle(response);
}
