"use client";

import { AuthPageContainer } from "@/components/SignUpForm/AuthPageContainer";
import { Button } from "@/components/SignUpForm/Button";
import { InputInlineLabel } from "@/components/SignUpForm/InputInlineLabel";
import classNames from "@/functions/classNames";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";

type SignUpFormInputs = {
  name: string;
  email: string;
  country: string;
  password: string;
  retryPassword: string;
};

export default function SignUp() {
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormInputs>();

  return (
    <AuthPageContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast({
            title: "Sign Up Successful",
            description: "You have successfully signed up.",
          });
        }}
        className="flex flex-col w-full gap-4 items-start"
      >
        <div className="w-full flex flex-col items-center gap-4">
          <InputInlineLabel
            type="text"
            label="Name"
            className="w-full "
            placeholder="Jane Smith"
            {...register("name", { required: true })}
          />

          <InputInlineLabel
            type="email"
            label="Email"
            className="w-full"
            placeholder="Your Email"
            {...register("email", { required: true })}
          />
          <InputInlineLabel
            type="text"
            label="Country"
            className="w-full "
            placeholder="United States"
            {...register("country", { required: true })}
          />
          <InputInlineLabel
            type="password"
            label="Password"
            className="w-full "
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <InputInlineLabel
            type="password"
            label="Re-enter Password"
            className="w-full "
            placeholder="Password"
            {...register("retryPassword", { required: true })}
          />
        </div>
        <Button
          disabled={
            !watch("name") ||
            !watch("email") ||
            !watch("country") ||
            !watch("password") ||
            !watch("retryPassword")
          }
          className={classNames("w-fit py-8 px-10 text-xl")}
        >
          Sign Up
        </Button>
      </form>
    </AuthPageContainer>
  );
}
