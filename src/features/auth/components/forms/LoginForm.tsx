import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginSchema, type LoginFormValues } from "../../schemas/login.schema";
import { Input } from "@/components/ui/Input";

interface Props {
  className?: string;
}

const LoginForm = ({ className = "" }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  async function submit() {}

  console.log(errors);
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`rounded-md p-7 sm:p-10 shadow-xl sm:min-w-100  bg-bg-primary ${className}`}
    >
      {/** Text */}
      <h2 className="text-text-primary text-xl text-center font-semibold">
        PRIJAVI SE NA SVOJ RAČUN
      </h2>
      <p className="text-text-secondary text-sm text-center">
        Dobrodošao nazad!
      </p>

      {/** Inputs */}
      <div className="my-5 space-y-3">
        <Input
          {...register("email")}
          errorMessage={errors.email?.message}
          label="E-Mail"
          placeholder="Unesi svoju e-mail adresu"
        />
        <Input
          {...register("password")}
          errorMessage={errors.password?.message}
          label="Lozinka"
          placeholder="Unesi svoju lozinku"
        />
      </div>

      {/** Submit */}
      <button type="submit">Prijavi se</button>
    </form>
  );
};

export default LoginForm;
