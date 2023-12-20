import React from "react";
import {useSelector} from "react-redux";
import {selectUserData} from "store/modules/auth/selectors";
import classes from "./personaldata.module.css";

const upFirstLetter = (text: string) => {
  const formatText = text.toLowerCase();
  return formatText[0].toUpperCase() + formatText.slice(1, formatText.length);
};
const PersonalDatas: React.FC = () => {
  const userInfo = useSelector(selectUserData);
  if (!userInfo || (userInfo && !userInfo.success)) {
    return null;
  }
  return (
    <div className={classes.datasContainer}>
      <div className={classes.personalItem}>
        <h3>{upFirstLetter("name")}</h3>
        <div>
          <span>{userInfo.name}</span>
          <button>Edit</button>
        </div>
      </div>
      <div className={classes.personalItem}>
        <h3>{upFirstLetter("email")}</h3>
        <div>
          <span>{userInfo.email}</span>
          <button>Edit</button>
        </div>
      </div>
      <div className={classes.personalItem}>
        <h3>{upFirstLetter("role")}</h3>
        <div>
          <span>{userInfo.role}</span>
          <button>Edit</button>
        </div>
      </div>
      <div className={classes.personalItem}>
        <h3>{upFirstLetter("createdAt")}</h3>
        <div>
          <span>{userInfo.createdAt}</span>
          <button>Edit</button>
        </div>
      </div>
      <div className={classes.personalItem}>
        <h3>{upFirstLetter("persPromo")}</h3>
        <div>
          <span>{userInfo.persPromo}</span>
          <button>Edit</button>
        </div>
      </div>
    </div>
  );
};
export default PersonalDatas;
