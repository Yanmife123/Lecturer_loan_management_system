import { AuthInstance } from "@/lib/axios";
import { axiosResponseHandle } from "@/lib/response";
import {
  AllFormData,
  Step1FormData,
  Step2FormData,
  Step3FormData,
} from "@/components/pages/auth/register/types";

export function loginApi() {}

type Register = Step1FormData & Step2FormData & Step3FormData;

export async function RegisterApi(data: FormData) {
  const response = await AuthInstance.post("/register", data);
  return axiosResponseHandle(response);
}
