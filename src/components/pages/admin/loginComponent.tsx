"use client";
import { Card } from "@/components/ui/card";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { EmailInput } from "@/components/utility/form/email-Input";
import { PasswordInput } from "@/components/utility/form/password-input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const signInScheme = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is Required"),
});

type FormSchema = z.infer<typeof signInScheme>;

export function AdminLoginForm() {
  const mutation = useMutation({
    mutationFn: async (formData: FormSchema) => {
      const res = await fetch("/api/loans", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      return res.json();
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormSchema>({
    resolver: zodResolver(signInScheme),
  });

  const onSubmit: SubmitHandler<FormSchema> = async (data) => {
    // mutation.mutate(data);
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center font-sans py-12 px-4">
      <Card className="w-full max-w-md py-10 space-y-6 px-7">
        <div className="flex flex-col gap-4 items-center">
          <div className="flex gap-4 items-center">
            <Link href={"/"}>
              <Image src={"/logo.svg"} alt="Logo icon" height={40} width={39} />
            </Link>
            <h2 className="text-primaryT text-xl leading-7">Admin Login</h2>
          </div>
          <p className="text-[#64748B] text-sm leading-5">
            Enter your credentials to access the admin portal
          </p>
        </div>
        <div className="py-3">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <EmailInput
                label="Admin Email"
                inputname="email"
                register={register}
                error={errors.email?.message}
              />
              <PasswordInput
                label="Password"
                inputname="password"
                register={register}
                error={errors.password?.message}
              />
              <div>
                <Button
                  className="py-6 px-5 w-full rounded-[16px]"
                  type="submit"
                  disabled={mutation.isPending}
                >
                  {mutation.isPending ? "Loginning in..." : "Login In"}
                </Button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex items-center flex-col gap-6">
          <div>
            <Link href={""} className="text-xs leading-4 text-[#64748B]">
              Forgot password?
            </Link>
          </div>
          <div className="border border-[#1B2E5E1A] h-px w-[90%]" />
          <div className="text-[#64748B] text-sm leading-5">
            Don't have an account?
          </div>
          <div>
            <Link
              href={""}
              className="text-base font-medium leading-6  text-[#C89B2A]"
            >
              Create Account
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
