import Link from "next/link";
import { ErrorLabeledInput } from "../../ui/form/errorLabeledInput";
import { StatefulForm } from "../../ui/form/statefulForm";

export function RegisterForm() {
  function onSubmit(data: Record<string, string>) {
    console.log(data);
  }
  return (
    <StatefulForm onSubmit={onSubmit}>
      <ErrorLabeledInput type="text" placeholder="Name" filedName="name" />
      <ErrorLabeledInput
        type="text"
        placeholder="Lastname"
        filedName="lastname"
      />
      <ErrorLabeledInput type="email" placeholder="Email" filedName="email" />
      <ErrorLabeledInput
        type="password"
        placeholder="Password"
        filedName="password"
        validationOptions={{
          minLength: 6,
          maxLength: 16,
        }}
      />
      <ErrorLabeledInput
        type="password"
        placeholder="Password Confirmation"
        filedName="passwordConfirmation"
        validationOptions={{
          validate: (value, values) =>
            value !== values.password &&
            "Password confirmation not matched with password field",
        }}
      />
      <label>
        <input className="me-1.5 align-middle" type="checkbox" />I agree to all{" "}
        <Link href={"/"}>Terms & Conditions</Link>
      </label>
      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded w-full"
      >
        Create Account
      </button>
    </StatefulForm>
  );
}
