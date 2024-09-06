import style from "./Button.module.css";

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const Button = ({ children, isLoading }: IProps) => {
  return (
    <button className={style.button}>
      {isLoading ? "Loading..." : children}
    </button>
  );
};
