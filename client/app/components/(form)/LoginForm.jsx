"use client";
import InputField from "@/components/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { loginSchema } from "@/lib/schemas/authschemas";
import Button from "@/components/Button";
import AuthLayout from "@/components/AuthLayout";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    toast.success("Successfull ");
    reset();
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
          </form>
        </AuthLayout>
      </div>
    </div>
  );
};

export default LoginForm;
