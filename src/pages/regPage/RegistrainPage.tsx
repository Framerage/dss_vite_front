import React, {useEffect, useState} from "react";
import {APP_GENERAL_ROUTES} from "utils/routes";
import {useAppDispatch} from "store";
import {useSelector} from "react-redux";
import {
  selectRegistrData,
  selectRegistrError,
  selectRegistrIsLoading,
} from "store/modules/auth/selectors";
import {UserRegistrationFx} from "store/modules/auth/async-actions";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import {createBrowserHistory} from "history";

import {EMAIL_PATTERN} from "constants/appConstants";
import classes from "./regPage.module.css";

interface RegFormData {
  email: string;
  pass: string;
  name: string;
  regPromo: string;
  repeatPass: string;
}
const minNameLength = 3;
const minPassLength = 6;
const RegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const history = createBrowserHistory();
  const dispatch = useAppDispatch();
  const regResult = useSelector(selectRegistrData);
  const regIsLoading = useSelector(selectRegistrIsLoading);
  const regError = useSelector(selectRegistrError);
  const [repeatPassEqual, setRepeatPassEqual] = useState(false);
  const [regPromoCode, setRegPromoCode] = useState("");

  const {handleSubmit, register, formState} = useForm<RegFormData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    shouldFocusError: false,
  });

  const namePatternError = formState.errors?.name?.type === "minLength";
  const passPatternError = formState.errors?.pass?.type === "minLength";
  const repeatpassPatternError =
    formState.errors?.repeatPass?.type === "minLength";
  const emailPatternError = formState.errors?.email?.type === "pattern";

  const onRegistrationUser = (data: RegFormData) => {
    const {name, pass, email, regPromo} = data;
    if (data.repeatPass === pass) {
      setRepeatPassEqual(false);
      dispatch(UserRegistrationFx({name, pass, email, regPromo}));
      return;
    }
    setRepeatPassEqual(true);
  };

  useEffect(() => {
    const promo =
      history.location.search &&
      history.location.search.split("=")[1].split("+");
    if (!promo[0]) {
      return;
    }
    setRegPromoCode(promo[0]);
  }, [history]);

  useEffect(() => {
    if (!regResult) {
      return;
    }
    if (regResult && !Array.isArray(regResult) && !regResult.success) {
      return;
    }
    if (regResult && Array.isArray(regResult)) {
      return;
    }
    navigate(APP_GENERAL_ROUTES.login.link);
  }, [regResult]);

  return (
    <form
      className={classes.formBlock}
      onSubmit={handleSubmit(onRegistrationUser)}
    >
      <h2 className={classes.formHead}>Registration</h2>
      <div className={classes.formItem}>
        <input
          type="text"
          {...register("name", {minLength: minNameLength})}
          name="name"
          placeholder="Имя"
          className={classes.inputItem}
          required
        />
        {namePatternError && (
          <div className={classes.inputErr}>
            Минимальное количство символов {minNameLength}
          </div>
        )}
      </div>
      <div className={classes.formItem}>
        <input
          type="text"
          {...register("email", {pattern: EMAIL_PATTERN})}
          name="email"
          placeholder="Почта"
          className={classes.inputItem}
          required
        />
        {emailPatternError && (
          <div className={classes.inputErr}>Формат неверный</div>
        )}
      </div>

      <div className={classes.formItem}>
        <input
          type="password"
          {...register("pass", {minLength: minPassLength})}
          name="pass"
          placeholder="Пароль"
          className={classes.inputItem}
          required
        />
        {passPatternError && (
          <div className={classes.inputErr}>
            Минимальное количство символов {minPassLength}
          </div>
        )}
      </div>
      <div className={classes.formItem}>
        <input
          type="password"
          {...register("repeatPass", {minLength: minPassLength})}
          name="repeatPass"
          placeholder="Повторите пароль"
          className={classes.inputItem}
          required
        />
        {(repeatPassEqual || repeatpassPatternError) && (
          <div className={classes.inputErr}>
            {repeatpassPatternError
              ? `Минимальное количство символов ${minPassLength}`
              : "Пароли не совпадают"}
          </div>
        )}
      </div>
      <input
        type="text"
        {...register("regPromo")}
        name="regPromo"
        placeholder="Промокод"
        className={classes.inputPromo}
        onChange={e => setRegPromoCode(e.target.value)}
        value={regPromoCode}
      />
      <button className={classes.submitBtn}>
        {regIsLoading ? "Loading..." : "Registration"}
      </button>
      {(regError ||
        (regResult && !Array.isArray(regResult) && !regResult.success) ||
        (regResult && Array.isArray(regResult))) && (
        <div className={classes.errorText}>
          Регистрация не удалась
          <br />
          {regResult && !Array.isArray(regResult) && !regResult.success
            ? regResult.message
            : regError}
        </div>
      )}
    </form>
  );
};
export default RegistrationPage;
