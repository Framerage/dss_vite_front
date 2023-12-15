import {ShopCartCardsForOrder} from "./catalogCards";

export interface OrderCreatingRequest {
  name: string;
  email: string;
  phoneNum: string;
  city: string;
  userCart: ShopCartCardsForOrder[];
  totalPrice: number;
}
export enum OrderStatuses {
  job = "в обработке",
  paid = "оплачено",
  complete = "завершен",
  canceled = "отменен",
}
export interface OrderRequestResult {
  name: string;
  email: string;
  phoneNum: string;
  city: string;
  userCart: string[];
  totalPrice: number;
  success: boolean;
  message: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  orderStatus: OrderStatuses;
  promo: string;
}
export interface Orders {
  orders: OrderRequestResult[];
  success: boolean;
}
