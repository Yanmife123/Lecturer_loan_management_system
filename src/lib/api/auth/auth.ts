import { AuthInstance, LoginInstance } from "@/lib/axios";
import { axiosResponseHandle } from "@/lib/response";
import {
  AllFormData,
  Step1FormData,
  Step2FormData,
  Step3FormData,
} from "@/components/pages/auth/register/types";

interface LoginData {
  email: string;
  password: string;
}
export async function loginApi(data: LoginData) {
  const response = await LoginInstance.post("/login", data);
  return axiosResponseHandle(response);
}

type Register = Step1FormData & Step2FormData & Step3FormData;

export async function RegisterApi(data: FormData) {
  const response = await AuthInstance.post("/register", data);
  return axiosResponseHandle(response);
}

export async function AdminLoginApi(data: LoginData) {
  const response = await LoginInstance.post("/admin/login", data);
  return axiosResponseHandle(response);
}
