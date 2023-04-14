import React from "react";
import styles from "./UserPage.module.css";
import logo from "../../images/Logo.png";
import homeImage from "../../images/picture.png";
import rectangle from "../../images/Rectangle.png";
const UserPage = ({
  isLoading,
  currentData,
  handleLoadMore,
  hendleClick,
  users,
  itemsPerPage,
  filteredTweet,
  isActive,
}) => {
  const data = isActive ? filteredTweet : currentData;
  return (
    <div className={styles.container}>
      {isLoading ? (
        <p className={styles.isLoading}>Loading...</p>
      ) : (
        <ul className={styles.cardContainer}>
          {data?.map(({ id, user, tweets, followers, avatar, following }) => (
            <li className={styles.cardItem} key={id}>
              <img className={styles.logo} src={logo} alt="goit" />
              <img
                className={styles.homeImage}
                src={homeImage}
                alt="homeImage"
              />
              <img
                className={styles.rectangle}
                src={rectangle}
                alt="rectangle"
              />
              <img className={styles.avatar} src={avatar} alt="boy" />
              <div className={styles.textWrapp}>
                <p className={styles.tweets}>{tweets} tweets</p>
                <p className={styles.followers}>
                  {followers.toLocaleString("en-US")} Followers
                </p>
              </div>
              <button
                onClick={() => hendleClick(id, following)}
                className={`${styles.followBtn} ${
                  following ? styles.active : ""
                }`}
                type="button"
              >
                {following ? "Following" : "Follow"}
              </button>
            </li>
          ))}
        </ul>
      )}
      {!isLoading && itemsPerPage < users.length && (
        <button
          onClick={handleLoadMore}
          className={styles.loadMoreBtn}
          type="button"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default UserPage;