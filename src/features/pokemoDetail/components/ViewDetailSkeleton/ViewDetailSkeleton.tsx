import styles from "../ViewDetail/ViewDetail.module.css";

export const ViewDetailSkeleton = () => {
  return (
    <article className={`${styles.container} ${styles.skeletonContainer}`}>
      <header className={styles.skeletonHeader}>
        <div className={styles.skeletonBack}></div>
        <div className={styles.skeletonTitle}></div>
        <div className={styles.skeletonId}></div>
      </header>

      <div className={styles.skeletonImage}></div>

      <section className={styles.secondSection}>
        <div className={styles.skeletonTypes}>
          <div className={styles.skeletonType}></div>
          <div className={styles.skeletonType}></div>
        </div>

        <section className={styles.about}>
          <div className={styles.skeletonSubtitle}></div>
          <div className={styles.aboutInfo}>
            <div className={styles.skeletonInfoItem}></div>
            <div className={styles.divider}></div>
            <div className={styles.skeletonInfoItem}></div>
            <div className={styles.divider}></div>
            <div className={styles.skeletonInfoItem}></div>
          </div>
          <div className={styles.skeletonDescription}></div>
        </section>

        <section className={styles.stats}>
          <div className={styles.skeletonSubtitle}></div>
          <ul className={styles.statsList}>
            {Array.from({ length: 6 }).map((_, i) => (
              <li key={i} className={styles.statRow}>
                <div className={styles.skeletonStatName}></div>
                <div className={styles.skeletonStatValue}></div>
                <div className={styles.skeletonProgress}></div>
              </li>
            ))}
          </ul>
        </section>
      </section>
    </article>
  );
};
