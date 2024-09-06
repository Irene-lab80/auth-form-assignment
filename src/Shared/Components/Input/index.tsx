import { memo } from "react";
import style from "./Input.module.css";

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = memo(
  ({ label, error, handleChange, value, ...props }: IProps) => {
    return (
      <div className={style.inputWrapper}>
        <label className={error ? style.error : ""} htmlFor="email">
          {error ? error : label}
        </label>
        <input
          {...props}
          className={error ? style.inputError : style.input}
          type="text"
          value={value}
          onChange={handleChange}
        />
      </div>
    );
  }
);
