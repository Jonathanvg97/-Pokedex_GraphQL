import styles from "./Card.module.css";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  const cardClass = `${styles.card} ${className}`;

  return <div className={cardClass}>{children}</div>;
};

export default Card;
