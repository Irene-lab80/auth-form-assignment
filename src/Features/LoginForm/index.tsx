import { FormEvent, useCallback, useState } from "react";
import { Button } from "../../Shared";

import style from "./LoginForm.module.css";
import { Input } from "../../Shared/Components";
import { FormData } from "../../Shared/utils/types";
import { mockRequest } from "../../Shared/utils/mockRequest";
import { initialValues, validate } from "./helpers";

export const LoginForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState<
    FormData | Record<string, string | null>
  >({});
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setErrors((prev) => ({ ...prev, [name]: null }));
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }, []);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);

    const errors = validate(formData.email, formData.password);
    if (Object.entries(errors).length) {
      setErrors(errors);
      return;
    }

    setErrors({});

    try {
      setIsLoading(true);
      const data = await mockRequest(formData);
      const body = await JSON.parse(data.json);

      setMessage(body);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>Log in</h2>
      <form onSubmit={submitHandler} className={style.form}>
        <Input
          error={errors.email}
          handleChange={handleChange}
          label="Email"
          placeholder="Enter email"
          name="email"
          id="email"
        />
        <Input
          error={errors.password}
          handleChange={handleChange}
          label="Пароль"
          placeholder="Enter пароль"
          name="password"
          id="password"
        />
        <Button isLoading={isLoading}>Log in</Button>
      </form>
      {message && (
        <div className={style.message}>
          <h3>{message}</h3>
        </div>
      )}
    </div>
  );
};
