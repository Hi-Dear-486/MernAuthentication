"use client";
import InputField from "@/components/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/lib/schemas/authschemas";
import Button from "@/components/Button";
import AuthLayout from "@/components/AuthLayout";
import Link from "next/link";
import { loginAuth } from "@/lib/api/authentication";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  let navigateTo = useRouter();
  const onSubmit = async (data) => {
    loginAuth(data, navigateTo, reset);
  };
  return (
    <div>
      <div className="font-[sans-serif] bg-white md:h-screen">
        <AuthLayout
          imageSrc="https://readymadeui.com/signin-image.webp"
          imageAlt="login-image"
        >
          <h3 className="text-2xl font-bold text-blue-300 mb-12">
            Create an account
          </h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
              label={"Email"}
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              error={errors.email?.message}
            />
            <InputField
              label={"Password"}
              type="password"
              placeholder="Enter your password"
              {...register("password")}
              error={errors.password?.message}
            />

            <Button
              type="submit"
              className="py-2 px-4 rounded bg-blue-400 text-white"
            >
              login
            </Button>
            <p className="text-sm mt-6 text-gray-800">
              Don't have an account?
              <Link
                href="/register"
                className="text-blue-500 font-semibold hover:underline ml-1"
              >
                Sign Up
              </Link>
            </p>
          </form>
        </AuthLayout>
      </div>
    </div>
  );
};

export default LoginForm;
