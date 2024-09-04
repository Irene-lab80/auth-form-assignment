import { SyntheticEvent, useState } from "react";

import style from "./LoginForm.module.css";

interface FormData {
  email: string;
  password: string;
}

interface Response {
  ok: boolean;
  status: number;
  json: string;
}

const initialValues: FormData = {
  email: "",
  password: "",
};

export const LoginForm = () => {
  const [formData, setFormData] = useState(initialValues);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({ email: "", name: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  console.log("userData", userData);
  const submitHandler = async (
    e: SyntheticEvent<HTMLFormElement, SubmitEvent>
  ) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const data = await mockSuccesfulResponse(200, formData);
      const body = await JSON.parse(data.json);
      setUserData((prevUserData) => ({ ...prevUserData, email: body.email, name: body.email.split('@')[0] }));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const mockSuccesfulResponse = (
    status = 200,
    returnBody: object
  ): Promise<Response> =>
    new Promise((resolve) =>
      setTimeout(
        () =>
          resolve({
            ok: true,
            status,
            json: JSON.stringify(returnBody),
          }),
        1000
      )
    );

  return (
    <div className={style.wrapper}>
      <h2 className={style.title}>Log in</h2>
      <div>{userData.name}, you've successfully authorised with the following email: {userData.email}</div>
      <form onSubmit={submitHandler} className={style.form}>
        <input
          className={style.input}
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="email"
        />
        <input
          className={style.input}
          type="text"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="password"
        />
        <button className={style.button}>
          {isLoading ? "Loading..." : "Log in"}
        </button>
      </form>
    </div>
  );
};
