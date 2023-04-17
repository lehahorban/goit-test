import React, { useState } from "react";
import styles from "./Dropdown.module.css";
import { useSelector } from "react-redux";

const Dropdown = ({
  onFilterChange,
  setFilteredTweet,
  setIsActive,
  setToggleFilter,
}) => {
  const [filter, setFilter] = useState("show_all");
  const { users } = useSelector((state) => state.user);

  const handleFilterChange = (event) => {
    const selectedFilter = event.target.value;
    setFilter(selectedFilter);
    setToggleFilter(selectedFilter);

    const filterArr = onFilterChange(selectedFilter);

    if (selectedFilter === "show_all") {
      setFilteredTweet(users);
      setIsActive(false);
    } else {
      setFilteredTweet(filterArr);
      setIsActive(true);
    }
  };

  return (
    <div className={styles.filter}>
      <label htmlFor="filter">Filter by:</label>
      <select
        id="filter"
        value={filter}
        onChange={handleFilterChange}
        className={styles.select}
      >
        <option value="show_all" className={styles.option}>
          Show All
        </option>
        <option value="follow" className={styles.option}>
          Follow
        </option>
        <option value="following" className={styles.option}>
          Following
        </option>
      </select>
    </div>
  );
};

export default Dropdown;
