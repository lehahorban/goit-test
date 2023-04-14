import React from "react";
import styles from "./App.module.css";
import Navbar from "../Navbar/Navbar";
import RoutesApp from "../Routes/Routes";

const App = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <RoutesApp />
    </div>
  );
};

export default App;
