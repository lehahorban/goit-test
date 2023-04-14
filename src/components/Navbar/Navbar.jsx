import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={styles.navbarContainer}>
      <div className={styles.header}>
        <div className={styles.leftHeader}>
          <Link to="/" className={styles.title}>
            Home
          </Link>
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

export default Navbar;
