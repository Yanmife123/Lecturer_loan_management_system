import { Instance1 } from "@/lib/axios";
import { axiosResponseHandle } from "@/lib/response";

export async function changeMemberRole(data: {
  memberId: string;
  role: string;
}) {
  const response = await Instance1.post(
    `/admin/members/${data.memberId}/change-role`,
    data,
  );
  return axiosResponseHandle(response);
}
