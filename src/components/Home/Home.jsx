import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Welcome to my Tweet page!</h1>
      <p className={styles.description}>
        Stay updated with my latest tweets and follow me for more content.
      </p>
    </div>
  );
};

export default Home;
