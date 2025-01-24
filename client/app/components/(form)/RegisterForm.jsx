"use client";
import AuthLayout from "@/components/AuthLayout";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registrationSchema } from "@/lib/schemas/authschemas";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registrationSchema),
  });

  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
    toast.success("Successfull ");
    reset();
  };

  return (
    <div className="font-[sans-serif] bg-white md:h-screen">
      <AuthLayout
        imageSrc="https://readymadeui.com/signin-image.webp"
        imageAlt="login-image"
      >
        <h3 className="text-2xl font-bold text-blue-300 mb-12">
          Create an account
        </h3>

        {/* Form Fields */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label={"Full Name"}
            type="text"
            placeholder="Enter your name"
            {...register("fullName")}
            error={errors.fullName?.message}
          />

          <InputField
            label={"Phone Number"}
            type="number"
            placeholder="Enter Phone Number"
            {...register("phone")}
            error={errors.phone?.message}
          />

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
            className="py-3 px-6 text-sm font-semibold  text-white bg-blue-500 rounded  focus:outline-none"
          >
            Register
          </Button>

          <p className="text-sm mt-6 text-gray-800">
            Already have an account?
            <a
              href="#"
              className="text-blue-500 font-semibold hover:underline ml-1"
            >
              Login here
            </a>
          </p>
        </form>
      </AuthLayout>
    </div>
  );
};

export default RegisterForm;
