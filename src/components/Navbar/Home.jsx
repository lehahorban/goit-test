import React from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <h1 className={styles.title}>Home</h1>
        </div>
        <div className={styles.rightHeader}>
          <Link to="/tweets" className={styles.tweetsLink}>
            Tweets
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
