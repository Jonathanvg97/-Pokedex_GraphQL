import React from "react";
import styles from "./TypeBadge.module.css";
import { getTypeColor } from "../../../../styles/typeColors";

interface TypeBadgeProps {
  type: string;
  children?: React.ReactNode;
}

const TypeBadge: React.FC<TypeBadgeProps> = ({ type, children }) => {
  const style = {
    backgroundColor: getTypeColor(type),
  };

  return (
    <span className={styles.typeBadge} style={style}>
      {children || type}
    </span>
  );
};

export default TypeBadge;
