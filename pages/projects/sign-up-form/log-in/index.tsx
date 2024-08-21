import { AuthPageContainer } from "@/components/SignUpForm/AuthPageContainer";
import { Button } from "@/components/SignUpForm/Button";
import { InputInlineLabel } from "@/components/SignUpForm/InputInlineLabel";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

type LogInFormInputs = {
  email: string;
  password: string;
};

export default function LogIn() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LogInFormInputs>();

  return (
    <AuthPageContainer>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          toast.success("Log In Successful");
        }}
        className="flex flex-col w-full gap-4"
      >
        <InputInlineLabel
          type="email"
          label="Email"
          className="w-full max-w-lg"
          placeholder="Your Email"
          {...register("email", { required: true })}
        />

        <InputInlineLabel
          type="password"
          label="Password"
          className="w-full max-w-lg"
          placeholder="Password"
          {...register("password", { required: true })}
        />

        <Button
          disabled={!watch("email") || !watch("password")}
          className={cn("w-fit py-8 px-10 text-xl")}
        >
          Log In
        </Button>
      </form>
    </AuthPageContainer>
  );
}
