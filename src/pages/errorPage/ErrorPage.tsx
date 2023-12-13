import React, {useEffect, useState} from "react";
import cn from "classnames";
import {useNavigate} from "react-router-dom";
import {APP_AUTH_ROUTES, APP_GENERAL_ROUTES} from "utils/routes";
import {useSelector} from "react-redux";
import {isUserAuth} from "store/modules/auth/selectors";
import classes from "./errPage.module.css";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const isAuth = useSelector(isUserAuth);
  const [timer, setTimer] = useState(10);
  useEffect(() => {
    if (timer === 0) {
      navigate(
        isAuth ? APP_AUTH_ROUTES.main.link : APP_GENERAL_ROUTES.main.link,
      );
      return;
    }
    setTimeout(() => setTimer(timer - 1), 1000);
  }, [timer]);
  return (
    <div className={classes.errPageContainer}>
      <div className={classes.errText}>
        Error 404. This page does not exist.
      </div>
      <div className={cn(classes.errText, classes.errTimer)}>
        Will return to "Main page" at:&nbsp;{timer}&nbsp;...
      </div>
    </div>
  );
};
export default ErrorPage;
