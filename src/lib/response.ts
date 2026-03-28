import { AxiosResponse } from "axios";

export function axiosResponseHandle(response: AxiosResponse) {
  if (!response.data.success) {
    console.log("Response Error:", response.data.message);
    throw new Error(response.data?.message || "Network Error");
  }
  return response.data;
}
