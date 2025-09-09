import { useState } from "react";
import styles from "./MenuFilter.module.css";
import { EnumTypeFilters } from "@/types/pokemon";

interface MenuFilterProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (value: EnumTypeFilters) => void;
}

export const MenuFilter: React.FC<MenuFilterProps> = ({
  open,
  setOpen,
  onChange,
}) => {
  const [selected, setSelected] = useState("number");

  const handleChange = (value: EnumTypeFilters) => {
    setSelected(value);
    onChange(value);
    setOpen(false); // opcional: cerrar después de elegir
  };

  if (!open) return null;

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Sort by:</h3>
      <div className={styles.options}>
        {Object.values(EnumTypeFilters).map((option) => (
          <label key={option} className={styles.option}>
            <input
              type="radio"
              name="sort"
              value={option}
              checked={selected === option}
              onChange={() => handleChange(option)}
            />
            <span className={styles.labelText}>
              {option === EnumTypeFilters.NUMBER ? "Number" : "Name"}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
};
