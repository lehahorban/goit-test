import React from "react";
import styles from "./UserCard.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, updateUserById } from "../../redux/user/userOperations";
import { updateFollowingById } from "../../redux/user/userSlice";
import UserPage from "../../pages/UserPage/UserPage";
import Dropdown from "../Dropdown/Dropdown";

const UserCard = () => {
  const { users } = useSelector((state) => state.user);
  const [isLoading, setIsLoading] = useState(true);

  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [filteredTweet, setFilteredTweet] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [toggleFilter, setToggleFilter] = useState("show_all");
  const [filteredData, setFilteredData] = useState([]);

  const currentPage = 1;
  const indexOfLastItem = itemsPerPage * currentPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = users.slice(indexOfFirstItem, indexOfLastItem);
  const data = isActive ? filteredData : currentData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUsers = localStorage.getItem("users");
    if (storedUsers) {
      dispatch({ type: "SET_USERS", payload: JSON.parse(storedUsers) });
    } else {
      dispatch(getUsers());
    }
  }, [dispatch]);

  useEffect(() => {
    if (users.length > 0) {
      setIsLoading(false);
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  useEffect(() => {
    let newData = users;

    if (isActive) {
      if (toggleFilter === "following") {
        newData = users.filter((item) => item.following === true);
      } else if (toggleFilter === "follow") {
        newData = users.filter((item) => item.following !== true);
      }
    }
    setFilteredData(newData);
  }, [users, isActive, toggleFilter]);

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 9);
  };

  const hendleClick = async (id, following) => {
    try {
      const userIndex = users.findIndex((el) => el.id === id);
      const tweetIndex = filteredTweet.findIndex((tweet) => tweet.id === id);
      if (!following) {
        const follow = users[userIndex].followers + 1;
        await dispatch(updateUserById({ id: users[userIndex].id, follow }));
        await dispatch(updateFollowingById({ id, following: true }));
        if (tweetIndex >= 0) {
          const newFilteredTweet = [...filteredTweet];
          newFilteredTweet[tweetIndex] = {
            ...newFilteredTweet[tweetIndex],
            following: true,
            followers: newFilteredTweet[tweetIndex].followers + 1,
          };
          setFilteredTweet(newFilteredTweet);
        }
      } else {
        const follow = users[userIndex].followers - 1;
        await dispatch(updateUserById({ id: users[userIndex].id, follow }));
        await dispatch(updateFollowingById({ id, following: false }));
        if (tweetIndex >= 0) {
          const newFilteredTweet = [...filteredTweet];
          newFilteredTweet[tweetIndex] = {
            ...newFilteredTweet[tweetIndex],
            following: false,
            followers: newFilteredTweet[tweetIndex].followers - 1,
          };
          setFilteredTweet(newFilteredTweet);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onFilterChange = (selectedFilter) => {
    const followingArr = users.filter((el) => el.following === true);
    const followArr = users.filter((el) => el.following !== true);

    if (selectedFilter === "following") {
      return followingArr;
    }
    if (selectedFilter === "follow") {
      return followArr;
    } else {
      return users;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.btnWrapp}>
        <button
          onClick={() => navigate("/")}
          className={styles.btnBack}
          type="button"
        >
          Back
        </button>
        <Dropdown
          onFilterChange={onFilterChange}
          setFilteredTweet={setFilteredTweet}
          setIsActive={setIsActive}
          filteredTweet={filteredTweet}
          setToggleFilter={setToggleFilter}
        />
      </div>
      <UserPage
        isLoading={isLoading}
        currentData={currentData}
        handleLoadMore={handleLoadMore}
        hendleClick={hendleClick}
        users={users}
        itemsPerPage={itemsPerPage}
        filteredTweet={filteredTweet}
        isActive={isActive}
        toggleFilter={toggleFilter}
        data={data}
      />
    </div>
  );
};

export default UserCard;
