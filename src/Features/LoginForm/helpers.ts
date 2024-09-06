import { FormData } from "../../Shared/utils/types";

export const initialValues: FormData = {
  email: "",
  password: "",
};

export function validate(email: string, password: string) {
  const errors = {} as Record<string, string>;

  if (email.length <= 5) {
    errors.email = "Email should be at least 5 charcters long";
  }

  if (password.length <= 5) {
    errors.password = "Password should be at least 5 charcters long";
  }

  return errors;
}
