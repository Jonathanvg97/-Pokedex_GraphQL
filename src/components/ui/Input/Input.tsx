import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input: React.FC<InputProps> = ({ error, className = '', ...props }) => {
  const inputClass = `${styles.input} ${error ? styles.error : ''} ${className}`;
  
  return (
    <div className={styles.inputContainer}>
      <input className={inputClass} {...props} />
      {error && <span className={styles.errorMessage}>{error}</span>}
    </div>
  );
};

export default Input;