"use client";
import AuthLayout from "@/components/AuthLayout";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registrationSchema } from "@/lib/schemas/authschemas";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/context/UserContext";
import Link from "next/link";
import { registraion, registraionAuth } from "@/lib/api/authentication";

const RegisterForm = () => {
  let { setUserDetails } = useAuth();
  let navigateTo = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registrationSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      verificationMethod: "",
    },
  });

  const onSubmit = async (data) => {
    registraionAuth(data, setUserDetails, navigateTo, reset);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField
            label={"Full Name"}
            type="text"
            placeholder="Enter your name"
            {...register("name")}
            error={errors.name?.message}
          />

          <InputField
            label={"Email"}
            type="email"
            placeholder="Enter your email"
            {...register("email")}
            error={errors.email?.message}
          />
          <InputField
            label={"Phone Number"}
            type="number"
            placeholder="Enter Phone Number"
            {...register("phone")}
            error={errors.phone?.message}
          />

          <InputField
            label={"Password"}
            type="password"
            placeholder="Enter your password"
            {...register("password")}
            error={errors.password?.message}
          />

          <div className="mb-4">
            <p className="text-gray-700 mb-2">Register using:</p>
            <div className="flex items-center gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="email"
                  {...register("verificationMethod")}
                  className="mr-2"
                />
                Email
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="phone"
                  {...register("verificationMethod")}
                  className="mr-2"
                />
                Phone
              </label>
            </div>
            {errors.verificationMethod && (
              <p className="text-red-500 text-sm mt-1">
                {errors.verificationMethod.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="py-3 px-6 text-sm font-semibold text-white bg-blue-500 rounded focus:outline-none"
          >
            Register
          </Button>

          <p className="text-sm mt-6 text-gray-800">
            Already have an account?
            <Link
              href="/login"
              className="text-blue-500 font-semibold hover:underline ml-1"
            >
              Login here
            </Link>
          </p>
        </form>
      </AuthLayout>
    </div>
  );
};

export default RegisterForm;
