import { useNavigate, useParams } from "react-router-dom";
import styles from "./ViewDetail.module.css";
import Button from "@/components/ui/Button/Button";
import BackIcon from "@/assets/icons/backIcon.png";
import BackgroundPokeball from "@/assets/images/background.png";
import WeigthIcon from "@/assets/icons/weight.png";
import HeightIcon from "@/assets/icons/straighten.png";
import { getTypeColor } from "../../utils/typeColors";
import { useDetail } from "../../hooks/useDetail";
import { ViewDetailSkeleton } from "../ViewDetailSkeleton/ViewDetailSkeleton";

export const ViewDetail = () => {
  //
  const { name } = useParams<{ name: string }>();
  //
  const navigate = useNavigate();
  const { detail, loading } = useDetail(name as string);

  if (loading) return <ViewDetailSkeleton />;

  const pokemon = detail;

  const mainType = pokemon?.types[0].type.name;
  const bgColor = getTypeColor(mainType as string);

  //UI
  return (
    <article
      className={styles.container}
      style={{
        backgroundColor: bgColor,
        padding: "0.4rem",
        zIndex: "-5",
      }}
    >
      <header
        style={{
          backgroundColor: bgColor,
          color: "#fff",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <img
          className={styles.background}
          src={BackgroundPokeball}
          alt="background"
        />

        <div className={styles.headerContent}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Button onClick={() => navigate(-1)} className={styles.backButton}>
              <img src={BackIcon} alt="back" />
            </Button>
            <h1 className={styles.title}>{pokemon?.name}</h1>
          </div>
        </div>
        <span className={styles.id}>
          #{pokemon?.id.toString().padStart(3, "0")}
        </span>
      </header>

      <img
        className={styles.image}
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon?.id}.png`}
        alt={pokemon?.name}
      />
      <section className={styles.secondSection}>
        <div className={styles.types}>
          {pokemon?.types.map((t) => (
            <span
              key={t.type.name}
              className={styles.type}
              style={{ backgroundColor: getTypeColor(t.type.name) }}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        <section className={styles.about}>
          <h2 style={{ textAlign: "center", color: bgColor, fontSize: "24px" }}>
            About
          </h2>
          <div className={styles.aboutInfo}>
            <div className={styles.aboutInfoItem}>
              <div className={styles.iconValue}>
                <img src={WeigthIcon} alt="weight" />
                <p>{pokemon && pokemon?.weight / 10} kg</p>
              </div>
              <span>Weight</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.aboutInfoItem}>
              <div className={styles.iconValue}>
                <img src={HeightIcon} alt="height" />
                <p>{pokemon && pokemon?.height / 10} m</p>
              </div>
              <span>Height</span>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.aboutInfoItem}>
              <div className={styles.iconValue}>
                <p>Chlorophyll</p>
              </div>
              <span>Moves</span>
            </div>
          </div>

          <p className={styles.description}>
            There is a plant seed on its back right from the day this Pokémon is
            born. The seed slowly grows larger.
          </p>
        </section>

        <section className={styles.stats}>
          <h2
            style={{
              textAlign: "center",
              color: bgColor,
              fontSize: "24px",
              marginBottom: "16px",
            }}
          >
            Base Stats
          </h2>
          <ul className={styles.statsList}>
            {pokemon?.stats.map((s) => (
              <li key={s.stat.name} className={styles.statRow}>
                <span className={styles.statName} style={{ color: bgColor }}>
                  {s.stat.name.toUpperCase()}
                </span>
                <span className={styles.statValue}>
                  {s.base_stat.toString().padStart(3, "0")}
                </span>
                <div className={styles.progressBar}>
                  <div
                    className={styles.progress}
                    style={{
                      width: `${(s.base_stat / 150) * 100}%`,
                      backgroundColor: bgColor,
                    }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </article>
  );
};
