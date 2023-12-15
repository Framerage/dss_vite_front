import {CatalogCardNesting} from "./catalogCards";

export interface UserAuthorisation {
  createdAt: string;
  email: string;
  name: string;
  persPromo: string;
  role: string;
  token: string;
  bonuses: number;
  updatedAt: string;
  __v: number;
  _id: string;
  message: string;
  success: boolean;
  status: number;
  userCart: string[];
  userLikes: string[];
}
export interface userRegistration {
  createdAt: string;
  email: string;
  name: string;
  persPromo: string;
  role: string;
  updatedAt: string;
  __v: number;
  _id: string;
  bonuses: number;
  message: string;
  success: boolean;
  status: number;
  userCart: string[];
  userLikes: string[];
}
export interface UserRegistrationValidation {
  location: string;
  msg: string;
  path: string;
  type: string;
  value: string;
}
export interface EditingUserExtraInfoResult {
  success: boolean;
  message: string;
  userCart: CatalogCardNesting[];
  userLikes: string[];
}
