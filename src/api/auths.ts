import {UserAuthorisation} from "typings/auths";
import instance from "./api";

export const getAuthToken = async ({
  email,
  pass,
}: {
  email: string;
  pass: string;
}) => {
  return instance
    .post("/auth/login", {email, pass})
    .then(res => res.data)
    .catch(err => {
      if (err.response.status === 404) {
        return {
          success: false,
          message: "Неполадки с сервером",
        };
      }
      return err.response.data;
    });
};
export const userRegistration = async (request: {
  email: string;
  pass: string;
  name: string;
  regPromo: string;
}) => {
  return instance
    .post("/auth/registration", {...request})
    .then(res => res.data)
    .catch(({response}) => response.data);
};
export const editUserExtraInfo = async ({
  user,
  auth,
}: {
  user: UserAuthorisation;
  auth: string;
}) => {
  return instance
    .put("/auth/me", {...user}, {headers: {Authorization: auth}})
    .then(res => res.data)
    .catch(err => err.response.data);
};
export const getAccountInfo = async (auth: string) => {
  return instance
    .get("/auth/me", {headers: {Authorization: auth}})
    .then(res => res.data)
    .catch(({resp}) => resp.data);
};
export const fetchUserShopCart = async ({
  cards,
  auth,
  email,
}: {
  cards: string[];
  auth: string;
  email: string;
}) => {
  return instance
    .post(
      "/auth/me/cart",
      {userCart: cards, email},
      {headers: {Authorization: auth}},
    )
    .then(res => res.data)
    .catch(err => {
      return {...err.response.data, success: false};
    });
};
