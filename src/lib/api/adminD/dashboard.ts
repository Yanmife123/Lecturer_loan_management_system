import { Instance1 } from "@/lib/axios";
import { axiosResponseHandle } from "@/lib/response";

export async function AdminDashboardStats() {
  const respnnse = await Instance1.get("/admin/dashboard");
  return axiosResponseHandle(respnnse);
}
export async function UserDashboardStats() {
  const respnnse = await Instance1.get("/user/dashboard");
  return axiosResponseHandle(respnnse);
}
