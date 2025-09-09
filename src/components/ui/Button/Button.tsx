import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  primary?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  primary,
  disabled,
  ...props
}) => {
  const buttonClass = `${styles.button} ${primary ? styles.primary : ""} ${
    disabled ? styles.disabled : ""
  }`;

  return (
    <button className={buttonClass} disabled={disabled} {...props}>
      {children}
    </button>
  );
};

export default Button;
