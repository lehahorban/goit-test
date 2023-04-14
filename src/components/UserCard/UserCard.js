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

  const currentPage = 1;
  const indexOfLastItem = itemsPerPage * currentPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = users.slice(indexOfFirstItem, indexOfLastItem);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLoadMore = () => {
    setItemsPerPage(itemsPerPage + 9);
  };

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
  }, [users, currentData]);

  const hendleClick = (id, following) => {
    const user = users.find((el) => el.id === id);
    if (!following) {
      const follow = user.followers + 1;
      dispatch(updateUserById({ id: user.id, follow }));
      dispatch(updateFollowingById({ id, following: true }));
    } else {
      const follow = user.followers - 1;
      dispatch(updateUserById({ id: user.id, follow }));
      dispatch(updateFollowingById({ id, following: false }));
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
  console.log(isActive);

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
      />
    </div>
  );
};

export default UserCard;
